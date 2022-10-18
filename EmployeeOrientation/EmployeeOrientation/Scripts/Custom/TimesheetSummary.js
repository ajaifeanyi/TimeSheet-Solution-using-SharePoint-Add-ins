"use strict";
var TimesheetSummary = window.TimesheetSummary || {};
TimesheetSummary = function () {
    var e = function () {
        var j = "";
        $.ajax({
            url: appweburl + "/_api/contextinfo",
            method: "POST",
            async: false,
            headers: {
                Accept: "application/json; odata=verbose"
            },
            cache: false,
            success: function (k) {
                j = k.d.GetContextWebInformation.FormDigestValue
            },
            error: function (k, l, m) {
                alert(m)
            }
        });
        return j
    }
        , f = function (j) {
            var k;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/UserProfiles/?$inlinecount=allpages&$select=User&$expand=User,Manager&$filter=ManagerId eq " + j,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (l) {
                    k = l.d.results
                },
                error: function (l, m, n) {
                    alert(n)
                }
            });
            return k
        }
        , i = function (l, j) {
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
        , h = function (j, k) {
            var m = "";
            if (j != null) {
                for (var l = 0; l < j.length; l++) {
                    if (j[l].User != null) {
                        m += k + " eq " + j[l].User.Id + " ";
                        if (l < j.length - 1) {
                            m += " or "
                        }
                    }
                }
            }
            return m
        }
        , g = function () {
            var j;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/Settings?$select=Id,Title,EnableAttachments,CustomFieldsSchema,CustomSheetFieldsSchema,ProjectsEnabled,CategoryEnabled,TitleEnabled",
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (k) {
                    j = k.d.results[0]
                },
                error: function (k, l, m) {
                    alert(m)
                }
            });
            return j
        }
        , d = function (j) {
            var l;
            var p = "Period eq '" + $("#ddlPeriod").val() + "' and Year eq '" + $("#ddlYear").val() + "' ";
            var r = "";
            if ($.trim($("#txtRequesterName").val()).length > 0) {
                r = " and substringof('" + $("#txtRequesterName").val().StripTags() + "',RequesterName) "
            }
            var u = "";
            if ($.trim($("#txtTitle").val()).length > 0) {
                u = " and substringof('" + $("#txtTitle").val().StripTags() + "',Title) "
            }
            var t = " ";
            if ($("#chblStatus").val() != null) {
                t = " and (" + i($("#chblStatus").val(), "Status") + ") "
            }
            var m = rowLimiterFilter + p + r + u + t;
            var o = f(j);
            m += " and (" + (o.length > 0 ? h(o, "RequesterId") : " RequesterId eq 0 ") + ")";
            var k = ",";
            for (var n = 1; n < 31; n++) {
                k += "CustomField" + n + (n < 30 ? "," : "")
            }
            var s = "Id,Created,RequesterName,Id,Statu,Created,Period,Year,TotalHours,TimeSheetJSON" + k;
            var q = appweburl + "/_vti_bin/ListData.svc/Requests/?$filter=" + m + "&$inlinecount=allpages&$select=" + s;
           // var s = "Id,Created,RequesterName,Id,Status,Created,Period,Year,TotalHours,TimeSheetJSON" + k;
            //var q = appweburl + "/_vti_bin/ListData.svc/Requests/?$filter=" + m + "&$inlinecount=allpages&$select=" + s;
            $.ajax({
                url: q,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (v) {
                    l = v.d.results
                }
            });
            return l
        }
        , a = function (k) {
            var j = e();
            var l;
            return $.Deferred(function (m) {
                $.ajax({
                    url: appweburl + "/_api/Web/lists/getbytitle('Requests')/getItemByStringId('" + k + "')",
                    async: true,
                    type: "DELETE",
                    headers: {
                        accept: "application/json;odata=verbose",
                        "X-RequestDigest": j,
                        "IF-MATCH": "*"
                    },
                    success: function (n) {
                        l = {
                            Result: "OK"
                        };
                        m.resolve(l)
                    },
                    error: function (p, n, o) {
                        m.reject()
                    }
                })
            })
        }
        , c = function () {
            var j;
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Projects')/items?$select=Id,Title,IsActive1&$filter=IsActive1 eq 1&$orderBy=Title asc&$top=1000",
                type: "GET",
                async: false,
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                success: function (k) {
                    j = k.d.results
                },
                error: function () {
                    alert(thrownError)
                }
            });
            return j
        }
        , b = function () {
            var j;
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Categories')/items?$select=Id,Title,IsActive1&$filter=IsActive1 eq 1&$orderBy=Title asc&$top=1000",
                type: "GET",
                async: false,
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                success: function (k) {
                    j = k.d.results
                },
                error: function () {
                    alert(thrownError)
                }
            });
            return j
        };
    return {
        getDataToExport: d,
        deleteItem: a,
        getRequestTemplate: g,
        getActiveProjects: c,
        getActiveCategories: b
    }
}();
$(document).ready(function () {
    if (CurrentUser.IsAdmin == false && CurrentUser.IsManager == false) {
        location.href = "AccessDenied.aspx";
        return
    }
    var G = TimesheetSummary.getRequestTemplate();
    if (G == null) {
        location.href = "NotFound.aspx";
        return
    }
    $("#btnRefresh").click(function (i) {
        i.preventDefault();
        var d = TimesheetSummary.getDataToExport(CurrentUser.Id);
        var M = [];
        $.each(d, function () {
            var N = this.RequesterName;
            var O = $.parseJSON(this.TimeSheetJSON);
            $.each(O, function () {
                if (isEmpty(this.Total) == false) {
                    var R = {
                        User: N
                    };
                    for (var Q = 0; Q < B.length; Q++) {
                        var P = B[Q].data;
                        if (isEmpty(this[P]) == false) {
                            R[P] = this[P]
                        }
                    }
                    if ($("#ddlProject").val() != "") {
                        if (isEmpty(this.Project) || this.Project != $("#ddlProject").val()) {
                            return
                        }
                    }
                    if ($("#ddlCategory").val() != "") {
                        if (isEmpty(this.Category) || this.Category != $("#ddlCategory").val()) {
                            return
                        }
                    }
                    if ($('input[name="rbBillable"]:checked').length) {
                        if ($('input[name="rbBillable"]:checked').val() == "yes") {
                            if (isEmpty(this.Billable) || this.Billable != "Yes") {
                                return
                            }
                        } else {
                            if (isEmpty(this.Billable) == false && this.Billable == "Yes") {
                                return
                            }
                        }
                    }
                    M.push(R)
                }
            })
        });
        $("#divTimeSheet").height(100 + M.length * 32);
        $("#divTimeSheet").data("handsontable").updateSettings({
            data: M
        })
    });
    $("#txtStartDate").datepicker();
    $("#txtEndDate").datepicker();
    $.datepicker.setDefaults({
        dateFormat: commonDateFormat,
        showButtonPanel: false,
        changeMonth: false,
        changeYear: false,
    });
    var o = (new Date()).getFullYear();
    var n = (SystemSettings.WeekNumbering == "ISO" ? moment().startOf("isoWeek").isoWeek() : moment().startOf("isoWeek").week());
    var y = $("#ddlYear");
    for (var D = o - 5; D < o + 2; D++) {
        y.append($("<option>", {
            value: D,
            text: D
        }))
    }
    y.val(o);
    var w = $("#ddlPeriod");
    if (SystemSettings.PeriodType == "Weekly") {
        for (var D = 1; D < 54; D++) {
            w.append($("<option>", {
                value: "Week " + D,
                text: "Week " + D
            }))
        }
        w.val("Week " + n)
    } else {
        if (SystemSettings.PeriodType == "Bi-Weekly") {
            for (var D = 1; D < 53; D++) {
                var J = "Weeks " + String(D) + "-" + String(D + 1);
                w.append($("<option>", {
                    value: J,
                    text: J
                }))
            }
            w.append($("<option>", {
                value: "Week 53",
                text: "Week 53"
            }));
            if (n == 53) {
                w.val("Week " + n)
            } else {
                var L = "";
                if (isEven(n) == false) {
                    L = String(n) + "-" + String(n + 1)
                } else {
                    L = String(n - 1) + "-" + String(n)
                }
                w.val("Weeks " + L)
            }
        } else {
            if (SystemSettings.PeriodType == "Monthly") {
                w.append($("<option>", {
                    value: "January",
                    text: "January"
                }));
                w.append($("<option>", {
                    value: "February",
                    text: "February"
                }));
                w.append($("<option>", {
                    value: "March",
                    text: "March"
                }));
                w.append($("<option>", {
                    value: "April",
                    text: "April"
                }));
                w.append($("<option>", {
                    value: "May",
                    text: "May"
                }));
                w.append($("<option>", {
                    value: "June",
                    text: "June"
                }));
                w.append($("<option>", {
                    value: "July",
                    text: "July"
                }));
                w.append($("<option>", {
                    value: "August",
                    text: "August"
                }));
                w.append($("<option>", {
                    value: "September",
                    text: "September"
                }));
                w.append($("<option>", {
                    value: "October",
                    text: "October"
                }));
                w.append($("<option>", {
                    value: "November",
                    text: "November"
                }));
                w.append($("<option>", {
                    value: "December",
                    text: "December"
                }));
                var E = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                var s = new Date();
                w.val(E[s.getMonth()])
            } else {
                if (SystemSettings.PeriodType == "Semi-Monthly") {
                    var m = "";
                    if ((moment().date() <= 15)) {
                        m = "1-15 " + moment().format("MMMM")
                    } else {
                        m = "16-" + moment().endOf("month").date() + " " + moment().format("MMMM")
                    }
                    var I = moment().startOf("month");
                    for (var D = 1; D < 13; D++) {
                        if (D > 1 || (moment().date() >= 15)) {
                            var H = "16-" + I.endOf("month").date() + " " + I.format("MMMM");
                            w.append($("<option>", {
                                value: H,
                                text: H
                            }))
                        }
                        var C = "1-15 " + I.format("MMMM");
                        w.append($("<option>", {
                            value: C,
                            text: C
                        }));
                        I = I.subtract(1, "months")
                    }
                    w.val(m)
                }
            }
        }
    }
    if (G.ProjectsEnabled != "false") {
        $("#pProjectFilter").show();
        var A = TimesheetSummary.getActiveProjects();
        var x = $("#ddlProject");
        $.each(A, function () {
            x.append($("<option>", {
                value: this.Title,
                text: this.Title
            }))
        })
    }
    if (G.CategoryEnabled != "false") {
        $("#pCategoryFilter").show();
        var z = TimesheetSummary.getActiveCategories();
        var v = $("#ddlCategory");
        $.each(z, function () {
            v.append($("<option>", {
                value: this.Title,
                text: this.Title
            }))
        })
    }
    if (SystemSettings.BillableHours) {
        $("#billableFilter").show()
    }
    var B = [];
    var F = 0;
    var l = 1000;
    var k = new Object();
    k.data = "User";
    k.title = "User";
    k.width = 200;
    k.readOnly = true;
    B.push(k);
    if (G.ProjectsEnabled != "false") {
        var f = new Object();
        f.data = "Project";
        f.title = "Project";
        f.width = 200;
        f.readOnly = true;
        B.push(f);
        F++;
        l += 200
    }
    if (G.TitleEnabled != "false") {
        var h = new Object();
        h.data = "Title";
        h.title = "Task Title";
        h.width = 350;
        h.readOnly = true;
        B.push(h);
        F++;
        l += 350
    }
    if (G.CategoryEnabled != "false") {
        var c = new Object();
        c.data = "Category";
        c.title = "Category";
        c.width = 150;
        c.readOnly = true;
        B.push(c);
        F++
    }
    var r = $.parseJSON(G.CustomSheetFieldsSchema);
    var p = new Object();
    var q = 0;
    var u = 0;
    if (SystemSettings.DateFieldsMode == "ondemand") {
        var e = new Object();
        e.data = "Date";
        e.title = "Date";
        e.width = 100;
        e.readOnly = true;
        B.push(e);
        F++
    }
    $.each(r, function () {
        if (isEmpty(this.FieldName) == false && isEmpty(this.FieldType) == false) {
            var d = new Object();
            d.data = this.FieldName;
            d.title = this.FieldName;
            d.readOnly = true;
            d.width = Math.round(parseFloat(this.Width));
            l += d.width;
            if (this.FieldType == "Text") {
                d.type = "text";
                p[this.VariableName] = ""
            } else {
                if (this.FieldType == "Number") {
                    d.type = "numeric";
                    d.format = "0," + G.NumberOfDecimalPlaces;
                    d.language = "en";
                    d.allowInvalid = false;
                    p[this.VariableName] = ""
                } else {
                    if (this.FieldType == "Boolean") {
                        d.type = "checkbox";
                        d.checkedTemplate = "Yes";
                        d.uncheckedTemplate = "No";
                        d.className = "handsonTableCheckbox";
                        p[this.VariableName] = "No"
                    } else {
                        if (this.FieldType == "Choice") {
                            if (this.Options != null) {
                                d.editor = "select";
                                var O = [];
                                var N = this.Options.split(",");
                                for (var M in N) {
                                    var i = (M != null && N[M] != null ? N[M].trim() : "");
                                    if (i != "") {
                                        O.push(i)
                                    }
                                }
                                d.selectOptions = N
                            }
                            p[this.VariableName] = ""
                        } else {
                            if (this.FieldType == "Date") {
                                d.type = "date";
                                d.showButtonPanel = false;
                                d.changeMonth = false;
                                d.changeYear = false;
                                p[this.VariableName] = ""
                            }
                        }
                    }
                }
            }
            B.push(d);
            q++
        }
    });
    $(".containerWrapper").width(l);
    var j = new Object();
    j.data = "Total";
    j.title = "Total hours";
    j.width = 80;
    j.format = "0," + G.NumberOfDecimalPlaces;
    j.readOnly = true;
    B.push(j);
    if (SystemSettings.BillableHours) {
        var b = new Object();
        b.data = "Billable";
        b.title = "Billable?";
        b.width = 70;
        B.push(b)
    }
    if (SystemSettings.BillingAmount) {
        var g = new Object();
        g.data = "Rate";
        g.title = "Hourly rate";
        g.width = 80;
        g.readOnly = true;
        g.type = "numeric";
        g.format = "0," + G.NumberOfDecimalPlaces;
        g.language = "en";
        g.allowInvalid = false;
        B.push(g);
        var a = new Object();
        a.data = "Amount";
        a.title = "Billing amount";
        a.width = 100;
        a.type = "numeric";
        a.format = "0," + G.NumberOfDecimalPlaces;
        a.language = "en";
        a.allowInvalid = false;
        a.readOnly = true;
        B.push(a)
    }
    var t = TimesheetSummary.getDataToExport(CurrentUser.Id);
    var K = [];
    $.each(t, function () {
        var d = this.RequesterName;
        var i = $.parseJSON(this.TimeSheetJSON);
        $.each(i, function () {
            if (isEmpty(this.Total) == false) {
                var O = {
                    User: d
                };
                for (var N = 0; N < B.length; N++) {
                    var M = B[N].data;
                    if (isEmpty(this[M]) == false) {
                        O[M] = this[M]
                    }
                }
                K.push(O)
            }
        })
    });
    $("#divTimeSheet").handsontable({
        data: K,
        minSpareRows: 0,
        startRows: 0,
        className: "htCenter",
        multiSelect: false,
        contextMenu: ["row_above", "row_below", "remove_row"],
        columns: B
    });
    $("#divTimeSheet").height(100 + K.length * 52)
});
