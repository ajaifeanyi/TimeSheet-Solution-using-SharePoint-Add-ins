"use strict";
var ReportsRequests = window.ReportsRequests || {};
ReportsRequests = function () {
    var c = function () {
        var i = "";
        $.ajax({
            url: appweburl + "/_api/contextinfo",
            method: "POST",
            async: false,
            headers: {
                Accept: "application/json; odata=verbose"
            },
            cache: false,
            success: function (j) {
                i = j.d.GetContextWebInformation.FormDigestValue
            },
            error: function (j, k, l) {
                alert(l)
            }
        });
        return i
    }
        , d = function (i) {
            var j;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/UserProfiles/?$inlinecount=allpages&$select=User&$expand=User,Manager&$filter=ManagerId eq " + i,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (k) {
                    j = k.d.results
                },
                error: function (k, l, m) {
                    alert(m)
                }
            });
            return j
        }
        , h = function (l, j) {
            var m = "";
            if (l != null) {
                for (var k = 0; k < l.length; k++) {
                    m += j + " eq '" + l[k] + "' ";
                    if (k < l.length - 1) {
                        m += " or "
                    }
                }
            }
            return m
        }
        , g = function (j, k) {
            var m = "";
            if (j != null) {
                for (var l = 0; l < j.length; l++) {
                    m += k + " eq " + j[l].User.Id + " ";
                    if (l < j.length - 1) {
                        m += " or "
                    }
                }
            }
            return m
        }
        , f = function () {
            var i;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/Settings?$select=Id,Title,EnableAttachments,CustomFieldsSchema,CustomSheetFieldsSchema",
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (j) {
                    i = j.d.results[0]
                },
                error: function (j, k, l) {
                    alert(l)
                }
            });
            return i
        }
        , b = function (s, l) {
            var n;
            var x = $("#txtStartDate").val().StripTags();
            var p = $("#txtEndDate").val().StripTags();
            if (moment(x).isValid() == false || moment(p).isValid() == false) {
                addMessage("Incorrect date format in date filter", "error");
                return false
            }
            var o = " (FirstDayOfPeriodDate ge datetime'" + x + "T00%3a00%3a00') and (FirstDayOfPeriodDate le datetime'" + p + "T23%3a59%3a00') ";
            var v = "";
            if ($.trim($("#txtRequesterName").val()).length > 0) {
                v = " and substringof('" + $("#txtRequesterName").val().StripTags() + "',RequesterName) "
            }
            var z = "";
            if ($.trim($("#txtTitle").val()).length > 0) {
                z = " and substringof('" + $("#txtTitle").val().StripTags() + "',Title) "
            }
            var y = " ";
            if ($("#chblStatus").val() != null) {
                y = " and (" + h($("#chblStatus").val(), "Status") + ") "
            }
            var k = " ";
            if ($.trim($("#txtAnyField").val()).length > 0) {
                var j = "substringof('" + $("#txtAnyField").val().StripTags() + "',Title) or ";
                for (var r = 1; r < 21; r++) {
                    j += " substringof('" + $("#txtAnyField").val().StripTags() + "',CustomField" + r + ")" + (r < 20 ? " or " : "")
                }
                k = " and (" + j + ") "
            }
            var q = rowLimiterFilter + o + v + z + y + k;
            if (s == "MyTeam") {
                var t = d(l);
                q += " and (" + (t.length > 0 ? g(t, "RequesterId") : " RequesterId eq 0 ") + ")"
            }
            var m = ",";
            for (var r = 1; r < 31; r++) {
                m += "CustomField" + r + (r < 30 ? "," : "")
            }
            var w = "Id,Created,RequesterName,Id,Statu,Created,Period,Year,FirstDayOfPeriod,TotalHours,BillableHoursAmount,BillingAmountTotal,TimeSheetJSON" + m;
            var u = appweburl + "/_vti_bin/ListData.svc/Requests/?$filter=" + q + "&$inlinecount=allpages&$select=" + w;
            $.ajax({
                url: u,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (i) {
                    n = i.d.results
                }
            });
            return n
        }
        , a = function (j) {
            var i = c();
            var k;
            return $.Deferred(function (l) {
                $.ajax({
                    url: appweburl + "/_api/Web/lists/getbytitle('Requests')/getItemByStringId('" + j + "')",
                    async: true,
                    type: "DELETE",
                    headers: {
                        accept: "application/json;odata=verbose",
                        "X-RequestDigest": i,
                        "IF-MATCH": "*"
                    },
                    success: function (m) {
                        k = {
                            Result: "OK"
                        };
                        l.resolve(k)
                    },
                    error: function (o, m, n) {
                        l.reject()
                    }
                })
            })
        }
        , e = function (t, q, r, l) {
            var w;
            var x = $("#txtStartDate").val().StripTags();
            var n = $("#txtEndDate").val().StripTags();
            if (moment(x).isValid() == false || moment(n).isValid() == false) {
                addMessage("Incorrect date format in date filter", "error");
                return false
            }
            var m = " (FirstDayOfPeriodDate ge datetime'" + x + "T00%3a00%3a00') and (FirstDayOfPeriodDate le datetime'" + n + "T23%3a59%3a00') ";
            var v = "";
            if ($.trim($("#txtRequesterName").val()).length > 0) {
                v = " and substringof('" + $("#txtRequesterName").val().StripTags() + "',RequesterName) "
            }
            var z = "";
            if ($.trim($("#txtTitle").val()).length > 0) {
                z = " and substringof('" + $("#txtTitle").val().StripTags() + "',Title) "
            }
            var y = " ";
            if ($("#chblStatus").val() != null) {
                y = " and (" + h($("#chblStatus").val(), "Status") + ") "
            }
            var k = " ";
            if ($.trim($("#txtAnyField").val()).length > 0) {
                var j = "substringof('" + $("#txtAnyField").val().StripTags() + "',Title) or ";
                for (var p = 1; p < 21; p++) {
                    j += " substringof('" + $("#txtAnyField").val().StripTags() + "',CustomField" + p + ")" + (p < 20 ? " or " : "")
                }
                k = " and (" + j + ") "
            }
            var o = rowLimiterFilter + m + v + z + y + k;
            if (r == "MyTeam") {
                var s = d(l);
                o += " and (" + (s.length > 0 ? g(s, "RequesterId") : " RequesterId eq 0 ") + ")";
                if (s.length == 0) {
                    addMessage("You have no subordinates assigned (go to Administration->User Profiles).", "warning")
                }
            }
            var u = appweburl + "/_vti_bin/ListData.svc/Requests/?$filter=" + o + "&$inlinecount=allpages&$select=Id,Created,RequesterName,Id,Statu,Created,Period,FirstDayOfPeriod,Year,TotalHours,BillableHoursAmount,BillingAmountTotal&$orderby=" + q.jtSorting.replace(" DESC", " desc").replace(" ASC", " asc") + "&$skip=" + q.jtStartIndex + "&$top=" + q.jtPageSize;
            return $.Deferred(function (i) {
                $.ajax({
                    url: u,
                    type: "GET",
                    headers: {
                        accept: "application/json;odata=verbose"
                    },
                    dataType: "json",
                    data: t,
                    cache: false,
                    success: function (A) {
                        w = {
                            Result: "OK",
                            Records: A.d.results,
                            TotalRecordCount: A.d.__count
                        };
                        i.resolve(w)
                    },
                    error: function () {
                        i.reject()
                    }
                })
            })
        };
    return {
        getRequests: e,
        getDataToExport: b,
        deleteItem: a,
        getRequestTemplate: f
    }
}();
$(document).ready(function () {
    var b = ReportsRequests.getRequestTemplate();
    if (b == null) {
        location.href = "NotFound.aspx";
        return
    }
    var a = getQueryStringParameter("mode");
    if (typeof a == "undefined") {
        location.href = "NotFound.aspx";
        return
   
    if (a == "All" && CurrentUser.IsAdmin) {
        $("#reportTitle").text("All Timesheets");
        $("#title").text("All Timesheets")
    } else {
        if (a == "MyTeam" && (CurrentUser.IsAdmin || CurrentUser.IsManager)) {
            $("#reportTitle").text("My Team's Timesheets");
            $("#title").text("My Team's Timesheets")
        } else {
            location.href = "AccessDenied.aspx";
            return
        }
    } }
    $("#btnRefresh").click(function (d) {
        d.preventDefault();
        $("#TableRequests").jtable("reload")
    });
    $("#txtStartDate").datepicker();
    $("#txtEndDate").datepicker();
    $.datepicker.setDefaults({
        dateFormat: commonDateFormat,
        showButtonPanel: false,
        changeMonth: false,
        changeYear: false,
    });
    $("#txtStartDate").val(moment().subtract(365, "d").format("YYYY-MM-DD"));
    $("#txtEndDate").val(moment().add(1, "d").format("YYYY-MM-DD"));
    var c = function () {
        var e = navigator.appName === "Microsoft Internet Explorer";
        var d = !!navigator.userAgent.match(/Trident\/7\./);
        return !(e || d)
    };
    $("#btnExportBasicCSV").click(function (j) {
        var i = ReportsRequests.getDataToExport(a, CurrentUser.Id);
        var f = '","';
        var o = '"\r\n';
        var g = '"Id","Created","Status","User","Period","Period Start","Year","Total Hours"';
        if (SystemSettings.EnableExpenses) {
            g += ',"Total Amount","Total Reimbursement Amount"'
        }
        if (SystemSettings.BillableHours) {
            g += ',"Billable Hours"'
        }
        if (SystemSettings.BillingAmount) {
            g += ',"Total Billing Amount"'
        }
        g += "\r\n";
        $.each(i, function () {
            g += '"' + this.Id + f + moment(this.Created).format(commonDateFormat2) + f + this.Status + f + this.RequesterName + f + this.Period + f + this.FirstDayOfPeriod + f + this.Year + f + this.TotalHours + f;
            if (SystemSettings.BillableHours) {
                g += (isEmpty(this.BillableHoursAmount) ? "" : this.BillableHoursAmount.replace(",", "")) + f
            }
            if (SystemSettings.BillingAmount) {
                g += (isEmpty(this.BillingAmountTotal) ? "" : this.BillingAmountTotal.replace(",", "")) + f
            }
            g += o
        });
        var n = navigator.appName === "Microsoft Internet Explorer";
        var m = (navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Trident\/8\./) ? true : false);
        if (n && !m) {
            h = decodeURIComponent(g);
            var l = document.getElementById("csvDownloadFrame");
            l = l.contentWindow || l.contentDocument;
            l.document.open("text/csv", "replace");
            l.document.write(h);
            l.document.close();
            l.focus();
            l.document.execCommand("SaveAs", true, "export.csv")
        } else {
            if (window.navigator.msSaveOrOpenBlob) {
                var k = [g];
                var d = new Blob(k);
                window.navigator.msSaveBlob(d, "export.csv")
            } else {
                var h = "data:application/csv;charset=utf-8," + encodeURIComponent(g);
                $(this).attr({
                    download: "export-basic.csv",
                    href: h,
                    target: "_blank"
                })
            }
        }
    });
    $("a.btnExportBasic").click(function (k) {
        var l = $(this).attr("data-export-option");
        var j = ReportsRequests.getDataToExport(a, CurrentUser.Id);
        var d = '","';
        var p = '"\r\n';
        var h = 'Id","Created","Status","User","Period","Period Start","Year","Total Hours"';
        if (SystemSettings.BillableHours) {
            h += ',"Billable Hours"'
        }
        if (SystemSettings.BillingAmount) {
            h += ',"Total Billing Amount"'
        }
        var g = h.split('","');
        var q = $("#tableToExport");
        q.html("");
        var f = g.length;
        var o = $(q[0].insertRow(-1));
        for (var n = 0; n < f; n++) {
            var m = $("<th />");
            m.html(g[n].replace('"', ""));
            o.append(m)
        }
        $.each(j, function () {
            var r = "" + this.Id + d + moment(this.Created).format(commonDateFormat2) + d + this.Status + d + this.RequesterName + d + this.Period + d + this.FirstDayOfPeriod + d + this.Year + d + this.TotalHours + d;
            if (SystemSettings.BillableHours) {
                r += (isEmpty(this.BillableHoursAmount) ? "" : this.BillableHoursAmount.replace(",", "")) + d
            }
            if (SystemSettings.BillingAmount) {
                r += (isEmpty(this.BillingAmountTotal) ? "" : this.BillingAmountTotal.replace(",", "")) + d
            }
            var s = r.split('","');
            o = $(q[0].insertRow(-1));
            for (var i = 0; i < f; i++) {
                var e = $("<td />");
                e.html(s[i]);
                o.append(e)
            }
        });
        $("#tableToExport").tableExport({
            fileName: "export-basic",
            type: l,
            jspdf: {
                orientation: "p",
                format: "bestfit",
                margins: {
                    left: 20,
                    right: 10,
                    top: 20,
                    bottom: 20
                },
                autotable: {
                    styles: {
                        overflow: "linebreak"
                    },
                    tableWidth: "wrap"
                }
            }
        })
    });
    $("#btnExportCSV").click(function (l) {
        var k = ReportsRequests.getDataToExport(a, CurrentUser.Id);
        var q = ReportsRequests.getRequestTemplate();
        var f = '","';
        var r = '"\r\n';
        var g = '"Id","Created","Status","User","Period","Period Start","Year","Total Hours"';
        if (SystemSettings.BillableHours) {
            g += ',"Billable Hours"'
        }
        if (SystemSettings.BillingAmount) {
            g += ',"Total Billing Amount"'
        }
        var j = "";
        var i = [];
        var s = $.parseJSON(b.CustomFieldsSchema);
        $.each(s, function () {
            if (isEmpty(this.FieldName) == false && isEmpty(this.FieldType) == false && isEmpty(this.ColumnName) == false) {
                j += ',"' + this.FieldName + '"';
                i.push(this.ColumnName)
            }
        });
        g += j + "\r\n";
        $.each(k, function () {
            g += '"' + this.Id + f + moment(this.Created).format(commonDateFormat2) + f + this.Status + f + this.RequesterName + f + this.FirstDayOfPeriod + f + this.Period + f + this.Year + f + this.TotalHours + f;
            if (SystemSettings.BillableHours) {
                g += (isEmpty(this.BillableHoursAmount) ? "" : this.BillableHoursAmount.replace(",", "")) + f
            }
            if (SystemSettings.BillingAmount) {
                g += (isEmpty(this.BillingAmountTotal) ? "" : this.BillingAmountTotal.replace(",", "")) + f
            }
            for (var t = 0; t < i.length; t++) {
                var e = this[i[t]] != null ? this[i[t]] : "";
                g += e + (t < i.length - 1 ? f : "")
            }
            g += r
        });
        var p = navigator.appName === "Microsoft Internet Explorer";
        var o = (navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Trident\/8\./) ? true : false);
        if (p && !o) {
            h = decodeURIComponent(g);
            var n = document.getElementById("csvDownloadFrame");
            n = n.contentWindow || n.contentDocument;
            n.document.open("text/csv", "replace");
            n.document.write(h);
            n.document.close();
            n.focus();
            n.document.execCommand("SaveAs", true, "export.csv")
        } else {
            if (window.navigator.msSaveOrOpenBlob) {
                var m = [g];
                var d = new Blob(m);
                window.navigator.msSaveBlob(d, "export.csv")
            } else {
                var h = "data:application/csv;charset=utf-8," + encodeURIComponent(g);
                $(this).attr({
                    download: "export.csv",
                    href: h,
                    target: "_blank"
                })
            }
        }
    });
    $("#btnExportDetailsCSV").click(function (n) {
        var m = ReportsRequests.getDataToExport(a, CurrentUser.Id);
        var u = ReportsRequests.getRequestTemplate();
        var f = '","';
        var v = '"\r\n';
        var g = '"Timesheet Id","User","Period","First Day of Period","Year","Status"';
        var k = "";
        var j = [];
        var l = $.parseJSON(u.CustomSheetFieldsSchema);
        k += ',"Project","Task Title","Category"';
        j.push("Project");
        j.push("Title");
        j.push("Category");
        if (SystemSettings.DateFieldsMode == "ondemand") {
            k += ',"Date"';
            j.push("Date")
        }
        $.each(l, function () {
            if (isEmpty(this.FieldName) == false && isEmpty(this.FieldType) == false) {
                k += ',"' + this.FieldName + '"';
                j.push(this.FieldName)
            }
        });
        if (SystemSettings.DateFieldsMode != "ondemand") {
            var t = 7;
            if (SystemSettings.PeriodType == "Bi-Weekly") {
                t = 14
            } else {
                if (SystemSettings.PeriodType == "Semi-Monthly") {
                    t = 16
                } else {
                    if (SystemSettings.PeriodType == "Monthly") {
                        t = 31
                    }
                }
            }
            for (var p = 1; p < t + 1; p++) {
                k += ',"Day ' + String(p) + '"';
                j.push(String(p))
            }
        }
        k += ',"Sub Total Hours"';
        j.push("Total");
        if (SystemSettings.BillableHours) {
            k += ',"Billable?"';
            j.push("Billable")
        }
        if (SystemSettings.BillingAmount) {
            k += ',"Hourly Rate"';
            j.push("Rate");
            k += ',"Billing amount"';
            j.push("Amount")
        }
        g += k + "\r\n";
        $.each(m, function () {
            var w = this.Id;
            var x = this.RequesterName;
            var y = this.Status;
            var i = this.Period;
            var e = this.FirstDayOfPeriod;
            var A = this.Year;
            var z = $.parseJSON(this.TimeSheetJSON);
            $.each(z, function () {
                var D = "";
                var B = 0;
                for (var C = 0; C < j.length; C++) {
                    if (this[j[C]] != null) {
                        D += this[j[C]] + (C < j.length - 1 ? f : "");
                        B++
                    } else {
                        D += "" + (C < j.length - 1 ? f : "")
                    }
                }
                if (B > 0) {
                    g += '"' + w + f + x + f + i + f + e + f + A + f + y + f + D + v
                }
            })
        });
        var s = navigator.appName === "Microsoft Internet Explorer";
        var r = (navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Trident\/8\./) ? true : false);
        if (s && !r) {
            h = decodeURIComponent(g);
            var q = document.getElementById("csvDownloadFrame");
            q = q.contentWindow || q.contentDocument;
            q.document.open("text/csv", "replace");
            q.document.write(h);
            q.document.close();
            q.focus();
            q.document.execCommand("SaveAs", true, "export-timesheets.csv")
        } else {
            if (window.navigator.msSaveOrOpenBlob) {
                var o = [g];
                var d = new Blob(o);
                window.navigator.msSaveBlob(d, "export-timesheets.csv")
            } else {
                var h = "data:application/csv;charset=utf-8," + encodeURIComponent(g);
                $(this).attr({
                    download: "export-timesheets.csv",
                    href: h,
                    target: "_blank"
                })
            }
        }
    });
    $("#btnExportXLSX").click(function (m) {
        var l = ReportsRequests.getDataToExport(a, CurrentUser.Id);
        var d = '","';
        var q = "";
        var h = 'Id","Created","Status","User","Period","Year","Total Hours"';
        if (SystemSettings.BillableHours) {
            h += ',"Billable Hours"'
        }
        if (SystemSettings.BillingAmount) {
            h += ',"Total Billing Amount"'
        }
        var k = "";
        var j = [];
        var r = $.parseJSON(b.CustomFieldsSchema);
        $.each(r, function () {
            if (isEmpty(this.FieldName) == false && isEmpty(this.FieldType) == false && isEmpty(this.ColumnName) == false) {
                k += ',"' + this.FieldName + '"';
                j.push(this.ColumnName)
            }
        });
        h += k + "";
        var g = h.split('","');
        var s = $("#tableToExport");
        s.html("");
        var f = g.length;
        var p = $(s[0].insertRow(-1));
        for (var o = 0; o < f; o++) {
            var n = $("<th />");
            n.html(g[o].replace('"', ""));
            p.append(n)
        }
        $.each(l, function () {
            var w = "" + this.Id + d + moment(this.Created).format(commonDateFormat2) + d + this.Status + d + this.RequesterName + d + this.Period + d + this.Year + d + this.TotalHours + d;
            if (SystemSettings.BillableHours) {
                w += (isEmpty(this.BillableHoursAmount) ? "" : this.BillableHoursAmount.replace(",", "")) + d
            }
            if (SystemSettings.BillingAmount) {
                w += (isEmpty(this.BillingAmountTotal) ? "" : this.BillingAmountTotal.replace(",", "")) + d
            }
            for (var u = 0; u < j.length; u++) {
                var t = this[j[u]] != null ? this[j[u]] : "";
                w += t + (u < j.length - 1 ? d : "")
            }
            var x = w.split('","');
            p = $(s[0].insertRow(-1));
            for (var v = 0; v < f; v++) {
                var e = $("<td />");
                e.html(x[v]);
                p.append(e)
            }
        });
        s.tableExport({
            fileName: "export",
            worksheetName: "Export",
            theadSelector: "th",
            type: "xlsx",
        })
    });
    $("#btnExportDetailsXLSX").click(function (n) {
        var m = ReportsRequests.getDataToExport(a, CurrentUser.Id);
        var r = ReportsRequests.getRequestTemplate();
        var d = '","';
        var t = "";
        var h = 'Timesheet Id","User","Period","First Day of Period","Year","Status"';
        var k = "";
        var j = [];
        var l = $.parseJSON(r.CustomSheetFieldsSchema);
        k += ',"Project","Task Title","Category"';
        j.push("Project");
        j.push("Title");
        j.push("Category");
        if (SystemSettings.DateFieldsMode == "ondemand") {
            k += ',"Date"';
            j.push("Date")
        }
        $.each(l, function () {
            if (isEmpty(this.FieldName) == false && isEmpty(this.FieldType) == false) {
                k += ',"' + this.FieldName + '"';
                j.push(this.FieldName)
            }
        });
        if (SystemSettings.DateFieldsMode != "ondemand") {
            var q = 7;
            if (SystemSettings.PeriodType == "Bi-Weekly") {
                q = 14
            } else {
                if (SystemSettings.PeriodType == "Semi-Monthly") {
                    q = 16
                } else {
                    if (SystemSettings.PeriodType == "Monthly") {
                        q = 31
                    }
                }
            }
            for (var p = 1; p < q + 1; p++) {
                k += ',"Day ' + String(p) + '"';
                j.push(String(p))
            }
        }
        k += ',"Sub Total Hours"';
        j.push("Total");
        if (SystemSettings.BillableHours) {
            k += ',"Billable?"';
            j.push("Billable")
        }
        if (SystemSettings.BillingAmount) {
            k += ',"Hourly Rate"';
            j.push("Rate");
            k += ',"Billing amount"';
            j.push("Amount")
        }
        h += k;
        var g = h.split('","');
        var u = $("#tableToExport");
        u.html("");
        var f = g.length;
        var s = $(u[0].insertRow(-1));
        for (var p = 0; p < f; p++) {
            var o = $("<th />");
            o.html(g[p].replace('"', ""));
            s.append(o)
        }
        $.each(m, function () {
            var v = this.Id;
            var w = this.RequesterName;
            var x = this.Status;
            var i = this.Period;
            var e = this.FirstDayOfPeriod;
            var z = this.Year;
            var y = $.parseJSON(this.TimeSheetJSON);
            $.each(y, function () {
                var G = "";
                var B = 0;
                for (var C = 0; C < j.length; C++) {
                    if (this[j[C]] != null) {
                        G += this[j[C]] + (C < j.length - 1 ? d : "");
                        B++
                    } else {
                        G += "" + (C < j.length - 1 ? d : "")
                    }
                }
                if (B > 0) {
                    var E = "" + v + d + w + d + i + d + e + d + z + d + x + d + G;
                    var F = E.split('","');
                    s = $(u[0].insertRow(-1));
                    for (var D = 0; D < f; D++) {
                        var A = $("<td />");
                        A.html(F[D]);
                        s.append(A)
                    }
                }
            })
        });
        u.tableExport({
            fileName: "export-timesheets",
            worksheetName: "Export",
            type: "xlsx"
        })
    });
    $("#exportGeneralInfo").opentip("Exports all fields from 'General Info' tab.", {
        delay: 0
    });
    $("#exportTimesheets").opentip("Exports all fields from 'TimeSheet Details' tab.", {
        delay: 0
    });
    $("#exportBasicData").opentip("Exports basic info (without custom fields)", {
        delay: 0
    });
    $("#TableRequests").jtable({
        title: "Timesheets list",
        paging: true,
        pageSize: 10,
        pageSizes: [10, 25, 50, 100, 250, 500, 1000],
        sorting: true,
        multiSorting: true,
        defaultSorting: "Id desc",
        actions: {
            listAction: function (e, d) {
                return ReportsRequests.getRequests(e, d, a, CurrentUser.Id)
            },
            deleteAction: function (d) {
                return ReportsRequests.deleteItem(d.Id);
                $("#TableRequests").jtable("reload")
            }
        },
        fields: {
            Id: {
                key: true,
                create: false,
                edit: false,
                list: true,
                title: "Id",
                width: "4%"
            },
            Created: {
                title: "Created",
                width: "8%",
                display: function (d) {
                    var e = moment(d.record.Created);
                    if (e.isValid()) {
                        return e.format(commonDateFormat2)
                    }
                }
            },
            RequesterName: {
                title: "User",
                width: "17%"
            },
            Period: {
                title: "Period",
                width: "15%",
                display: function (d) {
                    return d.record.Period + " " + d.record.Year
                }
            },
            FirstDayOfPeriod: {
                title: "Period Start",
                width: "13%"
            },
            TotalHours: {
                title: "Total Hours",
                width: "10%",
                sorting: false,
            },
            BillableHoursAmount: {
                title: "Billable Hours",
                width: "10%",
                visibility: SystemSettings.BillableHours ? "fixed" : "hidden",
                sorting: false,
            },
            BillingAmountTotal: {
                title: "Total Amount (" + SystemSettings.CurrencySymbol + ")",
                width: "12%",
                visibility: SystemSettings.BillingAmount ? "fixed" : "hidden",
                sorting: false,
            },
            Statu: {
                title: "Status",
                width: "18%"
            },
            CustomViewAction: {
                title: "",
                listClass: "jtable-command-column",
                sorting: false,
                width: "1%",
                display: function (d) {
                    return "<button title='View' onclick='location.href=\"RequestFormView.html?requestID=" + d.record.Id + "\"' class='jtable-command-button jtable-view-command-button'><span>View</span></button>"
                }
            },
            CustomEditAction: {
                title: "",
                listClass: "jtable-command-column",
                sorting: false,
                width: "1%",
                display: function (d) {
                    return canEditAdminReport(d.record.Status) ? ("<button title='Edit' onclick='location.href=\"RequestFormEdit.html?requestID=" + d.record.Id + "\"' class='jtable-command-button jtable-edit-command-button'><span>Edit</span></button>") : ""
                }
            }
        }
    });
    $("#TableRequests").jtable("load")
});
