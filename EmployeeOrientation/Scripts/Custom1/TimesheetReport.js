"use strict";
var TimesheetReport = window.TimesheetReport || {};
var data;
Number.prototype.round = function (a) {
    return +(Math.round(this + "e+" + a) + "e-" + a)
}
    ;
TimesheetReport = function () {
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
        , e = function (g, f) {
            var m;
            var o = $("#txtStartDate").val().StripTags();
            var i = $("#txtEndDate").val().StripTags();
            if (moment(o).isValid() == false || moment(i).isValid() == false) {
                addMessage("Incorrect date format in date filter", "error");
                return false
            }
            var h = " (FirstDayOfPeriodDate ge datetime'" + o + "T00%3a00%3a00') and (FirstDayOfPeriodDate le datetime'" + i + "T23%3a59%3a00') ";
            var n = "";
            if ($.trim($("#txtRequesterName").val()).length > 0) {
                n = " and substringof('" + $("#txtRequesterName").val().StripTags() + "',RequesterName) "
            }
            var p = " ";
            if ($("#chblStatus").val() != null) {
                p = " and (" + c($("#chblStatus").val(), "Status") + ") "
            }
            var j = rowLimiterFilter + h + n + p;
            var k = a(g);
            j += " and (" + (k.length > 0 ? b(k, "RequesterId") : " RequesterId eq 0 ") + ")";
            if (k.length == 0) {
                addMessage("You have no subordinates assigned (go to Administration->User Profiles).", "warning")
            }
            if (f) {
                j += " and BillableHoursAmount ne null and BillableHoursAmount ne '' "
            }
            var l = appweburl + "/_vti_bin/ListData.svc/Requests/?$filter=" + j + "&$inlinecount=allpages&$select=Id,Created,RequesterName,Id,Status,Created,Period,Year,TotalHours,BillableHoursAmount,TimeSheetJSON";
            $.ajax({
                url: l,
                type: "GET",
                async: false,
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                success: function (q) {
                    m = q.d.results
                },
                error: function (q, r, s) {
                    alert(s)
                }
            });
            return m
        }
        , d = function (g, f) {
            var h = [];
            $.each(g, function () {
                var j = this.Period;
                var i = this.RequesterName;
                var k = $.parseJSON(this.TimeSheetJSON);
                $.each(k, function () {
                    if ((f == false || f && isEmpty(this.Billable) == false && this.Billable == "Yes") && isEmpty(this.Project) == false && this.Project != "undefined" && isEmpty(this.Total) == false && this.Total != "undefined") {
                        var l = new Object();
                        l.Project = this.Project;
                        l.Category = this.Category;
                        l.Total = this.Total;
                        l.Period = j;
                        l.Employee = i;
                        h.push(l)
                    }
                })
            });
            return h
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
    var a = $("#chbBillable").prop("checked");
    $("#btnRefresh").click(function (g) {
        g.preventDefault();
        a = $("#chbBillable").prop("checked");
        data = TimesheetReport.readReportsRequests(CurrentUser.Id, a);
        e = TimesheetReport.processTimeSheets(data, a);
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
    var b = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var d = b.getMonth() + 1 < 10 ? "0" + (b.getMonth() + 1) : b.getMonth() + 1;
    var c = b.getDate() < 10 ? "0" + b.getDate() : b.getDate();
    var f = b.getFullYear();
    if (SystemSettings.BillableHours) {
        $("#billableFilter").show()
    }
    $("#txtStartDate").val(moment().subtract(1, "months").format(commonDateFormat2));
    $("#txtEndDate").val(moment().add(1, "days").format(commonDateFormat2));
    data = TimesheetReport.readReportsRequests(CurrentUser.Id, a);
    var e = TimesheetReport.processTimeSheets(data, a);
    $("#Total").jtable({
        title: "Total Hours in selected period",
        paging: false,
        sorting: false,
        actions: {
            listAction: function (i, h) {
                var g = $("#chbBillable").prop("checked") ? "BillableHoursAmount" : "TotalHours";
                var k = _.reduce(data, function (l, n) {
                    return l + parseFloat(n[g].replace(/,/g, ""))
                }, 0);
                var j = {
                    records: [{
                        val: k.round(2)
                    }]
                };
                return {
                    Result: "OK",
                    Records: j.records
                }
            }
        },
        fields: {
            val: {
                title: "Hours",
                width: "100%",
                display: function (g) {
                    return numeral(g.record.val).format("0,0.0")
                }
            }
        }
    });
    $("#Total").jtable("load");
    $("#TotalByPeriod").jtable({
        title: "Total Hours by Period",
        paging: false,
        sorting: false,
        defaultSorting: "Total desc",
        actions: {
            listAction: function (k, i) {
                var h = _(data).groupBy("Period");
                var g = $("#chbBillable").prop("checked") ? "BillableHoursAmount" : "TotalHours";
                var j = _(h).map(function (l, m) {
                    return {
                        Period: m,
                        val: _(l).reduce(function (n, o) {
                            return n + parseFloat(o[g].replace(/,/g, ""))
                        }, 0)
                    }
                });
                return {
                    Result: "OK",
                    Records: j
                }
            }
        },
        fields: {
            Period: {
                title: "Period",
                width: "50%",
            },
            val: {
                title: "Hours",
                width: "50%",
                display: function (g) {
                    return numeral(g.record.val).format("0,0.0")
                }
            }
        }
    });
    $("#TotalByPeriod").jtable("load");
    if (SystemSettings.ProjectsEnabled != "false") {
        $("#TotalByProject").jtable({
            title: "Total Hours by Project",
            paging: false,
            sorting: false,
            defaultSorting: "Total desc",
            actions: {
                listAction: function (j, h) {
                    var g = _(e).groupBy("Project");
                    var i = _(g).map(function (k, l) {
                        return {
                            Project: l,
                            val: _(k).reduce(function (n, o) {
                                return n + parseFloat(o.Total.replace(/,/g, ""))
                            }, 0)
                        }
                    });
                    return {
                        Result: "OK",
                        Records: i
                    }
                }
            },
            fields: {
                Project: {
                    title: "Project",
                    width: "50%",
                },
                val: {
                    title: "Hours",
                    width: "50%",
                    display: function (g) {
                        return numeral(g.record.val).format("0,0.0")
                    }
                }
            }
        });
        $("#TotalByProject").jtable("load")
    }
    if (SystemSettings.CategoryEnabled != "false") {
        $("#TotalByCategory").jtable({
            title: "Total Hours by Category",
            paging: false,
            sorting: false,
            defaultSorting: "Total desc",
            actions: {
                listAction: function (j, h) {
                    var g = _(e).groupBy("Category");
                    var i = _(g).map(function (k, l) {
                        return {
                            Category: l,
                            val: _(k).reduce(function (n, o) {
                                return n + parseFloat(o.Total.replace(/,/g, ""))
                            }, 0)
                        }
                    });
                    return {
                        Result: "OK",
                        Records: i
                    }
                }
            },
            fields: {
                Category: {
                    title: "Category",
                    width: "50%",
                },
                val: {
                    title: "Hours",
                    width: "50%",
                    display: function (g) {
                        return numeral(g.record.val).format("0,0.0")
                    }
                }
            }
        });
        $("#TotalByCategory").jtable("load")
    }
    $("#TotalByUser").jtable({
        title: "Total Hours by User",
        paging: false,
        sorting: false,
        defaultSorting: "Total desc",
        actions: {
            listAction: function (k, i) {
                var h = _(data).groupBy("RequesterName");
                var g = $("#chbBillable").prop("checked") ? "BillableHoursAmount" : "TotalHours";
                var j = _(h).map(function (l, m) {
                    return {
                        RequesterName: m,
                        val: _(l).reduce(function (n, o) {
                            return n + parseFloat(o[g].replace(/,/g, ""))
                        }, 0)
                    }
                });
                return {
                    Result: "OK",
                    Records: j
                }
            }
        },
        fields: {
            RequesterName: {
                title: "User",
                width: "50%",
            },
            val: {
                title: "Hours",
                width: "50%",
                display: function (g) {
                    return numeral(g.record.val).format("0,0.0")
                }
            }
        }
    });
    $("#TotalByUser").jtable("load")
});
