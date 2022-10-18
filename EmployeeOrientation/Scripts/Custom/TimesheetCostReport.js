"use strict";
var TimesheetCostReport = window.TimesheetCostReport || {};
var data;
Number.prototype.round = function (a) {
    return +(Math.round(this + "e+" + a) + "e-" + a)
}
    ;
TimesheetCostReport = function () {
    var c = function (h, f) {
        var j = "";
        if (h != null) {
            for (var g = 0; g < h.length; g++) {
                j += f + " eq '" + h[g] + "' ";
                if (g < h.length - 1) {
                    j += " or "
                }
            }
        }
        return j
    }
        , a = function (f) {
            var g;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/UserProfiles/?$inlinecount=allpages&$select=User&$expand=User,Manager&$filter=ManagerId eq " + f,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (h) {
                    g = h.d.results
                },
                error: function (h, i, j) {
                    alert(j)
                }
            });
            return g
        }
        , b = function (f, g) {
            var j = "";
            if (f != null) {
                for (var h = 0; h < f.length; h++) {
                    if (f[h].User != null) {
                        j += g + " eq " + f[h].User.Id + " ";
                        if (h < f.length - 1) {
                            j += " or "
                        }
                    }
                }
            }
            return j
        }
        , e = function (f) {
            var l;
            var n = $("#txtStartDate").val().StripTags();
            var h = $("#txtEndDate").val().StripTags();
            if (moment(n).isValid() == false || moment(h).isValid() == false) {
                addMessage("Incorrect date format in date filter", "error");
                return false
            }
            var g = " (FirstDayOfPeriodDate ge datetime'" + n + "T00%3a00%3a00') and (FirstDayOfPeriodDate le datetime'" + h + "T23%3a59%3a00') ";
            var m = "";
            if ($.trim($("#txtRequesterName").val()).length > 0) {
                m = " and substringof('" + $("#txtRequesterName").val().StripTags() + "',RequesterName) "
            }
            var o = " ";
            if ($("#chblStatus").val() != null) {
                o = " and (" + c($("#chblStatus").val(), "Status") + ") "
            }
            var i = rowLimiterFilter + g + m + o;
            var j = a(f);
            i += " and (" + (j.length > 0 ? b(j, "RequesterId") : " RequesterId eq 0 ") + ")";
            if (j.length == 0) {
                addMessage("You have no subordinates assigned (go to Administration->User Profiles).", "warning")
            }
            i += " and BillingAmountTotal ne null and BillingAmountTotal ne '' ";
            var k = appweburl + "/_vti_bin/ListData.svc/Requests/?$filter=" + i + "&$inlinecount=allpages&$select=Id,Created,RequesterName,Id,Status,Created,Period,Year,TotalHours,BillingAmountTotal,TimeSheetJSON";
            $.ajax({
                url: k,
                type: "GET",
                async: false,
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                success: function (p) {
                    l = p.d.results
                },
                error: function (p, q, r) {
                    alert(r)
                }
            });
            return l
        }
        , d = function (f) {
            var g = [];
            $.each(f, function () {
                var i = this.Period;
                var h = this.RequesterName;
                var j = $.parseJSON(this.TimeSheetJSON);
                $.each(j, function () {
                    if (isEmpty(this.Project) == false && this.Project != "undefined" && isEmpty(this.Total) == false && this.Total != "undefined" && isEmpty(this.Amount) == false && this.Amount != "undefined") {
                        var k = new Object();
                        k.Project = this.Project;
                        k.AppCategory = this.AppCategory;
                        k.Total = this.Total;
                        k.Amount = this.Amount;
                        k.Period = i;
                        k.Employee = h;
                        g.push(k)
                    }
                })
            });
            return g
        };
    return {
        readReportsRequests: e,
        processTimeSheets: d
    }
}();
$(document).ready(function () {
    if (CurrentUser.IsAdmin == false && CurrentUser.IsManager == false) {
        location.href = "AccessDenied.aspx";
        return
    }
    $("#btnRefresh").click(function (f) {
        f.preventDefault();
        data = TimesheetCostReport.readReportsRequests(CurrentUser.Id);
        d = TimesheetCostReport.processTimeSheets(data);
        $("#Total").jtable("reload");
        $("#TotalByProject").jtable("reload");
        $("#TotalByCategory").jtable("reload");
        $("#TotalByPeriod").jtable("reload");
        $("#TotalByUser").jtable("reload")
    });
    $("#txtStartDate").datepicker();
    $("#txtEndDate").datepicker();
    $.datepicker.setDefaults({
        dateFormat: commonDateFormat,
        showButtonPanel: false,
        changeMonth: false,
        changeYear: false,
    });
    var a = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var c = a.getMonth() + 1 < 10 ? "0" + (a.getMonth() + 1) : a.getMonth() + 1;
    var b = a.getDate() < 10 ? "0" + a.getDate() : a.getDate();
    var e = a.getFullYear();
    if (SystemSettings.BillableHours) {
        $("#billableFilter").show()
    }
    $("#txtStartDate").val(moment().subtract(1, "months").format(commonDateFormat2));
    $("#txtEndDate").val(moment().add(1, "days").format(commonDateFormat2));
    data = TimesheetCostReport.readReportsRequests(CurrentUser.Id);
    var d = TimesheetCostReport.processTimeSheets(data);
    $("#Total").jtable({
        title: "Total Costs in selected period",
        paging: false,
        sorting: false,
        actions: {
            listAction: function (g, f) {
                var i = _.reduce(data, function (j, k) {
                    return j + parseFloat(k.BillingAmountTotal.replace(/,/g, ""))
                }, 0);
                var h = {
                    records: [{
                        val: i.round(2)
                    }]
                };
                return {
                    Result: "OK",
                    Records: h.records
                }
            }
        },
        fields: {
            val: {
                title: "Cost (" + SystemSettings.CurrencySymbol + ")",
                width: "100%",
                display: function (f) {
                    return numeral(f.record.val).format("0,0.0")
                }
            }
        }
    });
    $("#Total").jtable("load");
    $("#TotalByPeriod").jtable({
        title: "Total Costs by Period",
        paging: false,
        sorting: false,
        defaultSorting: "Total desc",
        actions: {
            listAction: function (i, g) {
                var f = _(data).groupBy("Period");
                var h = _(f).map(function (j, k) {
                    return {
                        Period: k,
                        val: _(j).reduce(function (l, n) {
                            return l + parseFloat(n.BillingAmountTotal.replace(/,/g, ""))
                        }, 0)
                    }
                });
                return {
                    Result: "OK",
                    Records: h
                }
            }
        },
        fields: {
            Period: {
                title: "Period",
                width: "50%",
            },
            val: {
                title: "Cost (" + SystemSettings.CurrencySymbol + ")",
                width: "50%",
                display: function (f) {
                    return numeral(f.record.val).format("0,0.0")
                }
            }
        }
    });
    $("#TotalByPeriod").jtable("load");
    if (SystemSettings.ProjectsEnabled != "false") {
        $("#TotalByProject").jtable({
            title: "Total Costs by Project",
            paging: false,
            sorting: false,
            defaultSorting: "Amount desc",
            actions: {
                listAction: function (i, g) {
                    var f = _(d).groupBy("Project");
                    var h = _(f).map(function (j, k) {
                        return {
                            Project: k,
                            val: _(j).reduce(function (l, n) {
                                return l + parseFloat(n.Amount)
                            }, 0)
                        }
                    });
                    return {
                        Result: "OK",
                        Records: h
                    }
                }
            },
            fields: {
                Project: {
                    title: "Project",
                    width: "50%",
                },
                val: {
                    title: "Cost (" + SystemSettings.CurrencySymbol + ")",
                    width: "50%",
                    display: function (f) {
                        return numeral(f.record.val).format("0,0.0")
                    }
                }
            }
        });
        $("#TotalByProject").jtable("load")
    }
    if (SystemSettings.CategoryEnabled != "false") {
        $("#TotalByCategory").jtable({
            title: "Total Costs by Category",
            paging: false,
            sorting: false,
            defaultSorting: "Amount desc",
            actions: {
                listAction: function (i, g) {
                    var f = _(d).groupBy("Category");
                    var h = _(f).map(function (j, k) {
                        return {
                            AppCategory: k,
                            val: _(j).reduce(function (l, n) {
                                return l + parseFloat(n.Amount)
                            }, 0)
                        }
                    });
                    return {
                        Result: "OK",
                        Records: h
                    }
                }
            },
            fields: {
                AppCategory: {
                    title: "Category",
                    width: "50%",
                },
                val: {
                    title: "Cost (" + SystemSettings.CurrencySymbol + ")",
                    width: "50%",
                    display: function (f) {
                        return numeral(f.record.val).format("0,0.0")
                    }
                }
            }
        });
        $("#TotalByCategory").jtable("load")
    }
    $("#TotalByUser").jtable({
        title: "Total Costs by User",
        paging: false,
        sorting: false,
        defaultSorting: "Total desc",
        actions: {
            listAction: function (i, g) {
                var f = _(data).groupBy("RequesterName");
                var h = _(f).map(function (j, k) {
                    return {
                        RequesterName: k,
                        val: _(j).reduce(function (l, n) {
                            return l + parseFloat(n.BillingAmountTotal.replace(/,/g, ""))
                        }, 0)
                    }
                });
                return {
                    Result: "OK",
                    Records: h
                }
            }
        },
        fields: {
            RequesterName: {
                title: "User",
                width: "50%",
            },
            val: {
                title: "Cost (" + SystemSettings.CurrencySymbol + ")",
                width: "50%",
                display: function (f) {
                    return numeral(f.record.val).format("0,0.0")
                }
            }
        }
    });
    $("#TotalByUser").jtable("load")
});
