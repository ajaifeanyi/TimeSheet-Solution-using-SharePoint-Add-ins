"use strict";
var SubmissionReport = window.SubmissionReport || {};
SubmissionReport = function () {
    var a = function () {
        var d;
        $.ajax({
            url: appweburl + "/_vti_bin/ListData.svc/UserProfiles/?$inlinecount=allpages&$select=Id,User,UserName,UserId,UserName",
            type: "GET",
            headers: {
                accept: "application/json;odata=verbose"
            },
            dataType: "json",
            async: false,
            cache: false,
            success: function (e) {
                d = e.d.results
            }
        });
        return d
    }
        , b = function (d) {
            var e;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/UserProfiles/?$inlinecount=allpages&$select=Id,User,UserName,UserId,UserName&$filter=ManagerId eq " + d,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                async: false,
                cache: false,
                success: function (f) {
                    e = f.d.results
                }
            });
            return e
        }
        , c = function () {
            var g;
            var e = "Period eq '" + $("#ddlPeriod").val() + "' and Year eq '" + $("#ddlYear").val() + "' ";
            var d = rowLimiterFilter + e;
            var h = "Id,Created,Modified,RequesterName,RequesterId,Id,Status,Created,Period,Year,TotalHours,TimeSheetJSON";
            var f = appweburl + "/_vti_bin/ListData.svc/Requests/?$filter=" + d + "&$inlinecount=allpages&$select=" + h;
            $.ajax({
                url: f,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (i) {
                    g = i.d.results
                }
            });
            return g
        };
    return {
        getTimesheets: c,
        getAllUserProfiles: a,
        getMyUsersProfiles: b
    }
}();
$(document).ready(function () {
    var n = getQueryStringParameter("mode");
    if (typeof n == "undefined") {
        location.href = "NotFound.aspx";
        return
    }
    if ((n == "All" && CurrentUser.IsAdmin == false) || (n == "Team" && CurrentUser.IsAdmin == false && CurrentUser.IsManager == false)) {
        location.href = "AccessDenied.aspx";
        return
    }
    $("#btnRefresh").click(function (i) {
        i.preventDefault();
        var t = $("#hideCreated").prop("checked");
        var u = $("#hideSubmitted").prop("checked");
        c = (n == "All" ? SubmissionReport.getAllUserProfiles() : SubmissionReport.getMyUsersProfiles(CurrentUser.Id));
        a = SubmissionReport.getTimesheets();
        b = {};
        $.each(a, function () {
            b[this.RequesterId] = this
        });
        $.each(c, function () {
            this.IsCreated = (String(this.UserId) in b ? true : false);
            if (this.IsCreated) {
                this.Created = b[this.UserId].Created
            }
            this.Status = (this.IsCreated == true ? b[this.UserId].Status : "");
            this.IsSubmitted = (this.IsCreated == true && isEmpty(this.Status) == false && this.Status != "Draft");
            this.TotalHours = (this.IsCreated == true ? b[this.UserId].TotalHours : "")
        });
        var d = [];
        $.each(c, function () {
            if (t == false && u == false) {
                d.push(this)
            } else {
                if (t == false && u == true) {
                    if (this.IsSubmitted == false) {
                        d.push(this)
                    }
                } else {
                    if (t == true && u == false) {
                        if (this.IsCreated == false) {
                            d.push(this)
                        }
                    } else {
                        if (t == true && u == true) {
                            if (this.IsCreated == false && this.IsSubmitted == false) {
                                d.push(this)
                            }
                        }
                    }
                }
            }
        });
        c = d;
        $("#TimesheetStatus").jtable("reload")
    });
    var g = (new Date()).getFullYear();
    var f = (SystemSettings.WeekNumbering == "ISO" ? moment().startOf("isoWeek").isoWeek() : moment().startOf("isoWeek").week());
    var k = $("#ddlYear");
    for (var m = g - 5; m < g + 2; m++) {
        k.append($("<option>", {
            value: m,
            text: m
        }))
    }
    k.val(g);
    var j = $("#ddlPeriod");
    if (SystemSettings.PeriodType == "Weekly") {
        for (var m = 1; m < 54; m++) {
            j.append($("<option>", {
                value: "Week " + m,
                text: "Week " + m
            }))
        }
        j.val("Week " + f)
    } else {
        if (SystemSettings.PeriodType == "Bi-Weekly") {
            for (var m = 1; m < 53; m++) {
                var r = "Weeks " + String(m) + "-" + String(m + 1);
                j.append($("<option>", {
                    value: r,
                    text: r
                }))
            }
            j.append($("<option>", {
                value: "Week 53",
                text: "Week 53"
            }));
            if (f == 53) {
                j.val("Week " + f)
            } else {
                var s = "";
                if (isEven(f) == false) {
                    s = String(f) + "-" + String(f + 1)
                } else {
                    s = String(f - 1) + "-" + String(f)
                }
                j.val("Weeks " + s)
            }
        } else {
            if (SystemSettings.PeriodType == "Monthly") {
                j.append($("<option>", {
                    value: "January",
                    text: "January"
                }));
                j.append($("<option>", {
                    value: "February",
                    text: "February"
                }));
                j.append($("<option>", {
                    value: "March",
                    text: "March"
                }));
                j.append($("<option>", {
                    value: "April",
                    text: "April"
                }));
                j.append($("<option>", {
                    value: "May",
                    text: "May"
                }));
                j.append($("<option>", {
                    value: "June",
                    text: "June"
                }));
                j.append($("<option>", {
                    value: "July",
                    text: "July"
                }));
                j.append($("<option>", {
                    value: "August",
                    text: "August"
                }));
                j.append($("<option>", {
                    value: "September",
                    text: "September"
                }));
                j.append($("<option>", {
                    value: "October",
                    text: "October"
                }));
                j.append($("<option>", {
                    value: "November",
                    text: "November"
                }));
                j.append($("<option>", {
                    value: "December",
                    text: "December"
                }));
                var o = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                var h = new Date();
                j.val(o[h.getMonth()])
            } else {
                if (SystemSettings.PeriodType == "Semi-Monthly") {
                    var e = "";
                    if ((moment().date() <= 15)) {
                        e = "1-15 " + moment().format("MMMM")
                    } else {
                        e = "16-" + moment().endOf("month").date() + " " + moment().format("MMMM")
                    }
                    var q = moment().startOf("month");
                    for (var m = 1; m < 13; m++) {
                        if (m > 1 || (moment().date() >= 15)) {
                            var p = "16-" + q.endOf("month").date() + " " + q.format("MMMM");
                            j.append($("<option>", {
                                value: p,
                                text: p
                            }))
                        }
                        var l = "1-15 " + q.format("MMMM");
                        j.append($("<option>", {
                            value: l,
                            text: l
                        }));
                        q = q.subtract(1, "months")
                    }
                    j.val(e)
                }
            }
        }
    }
    var c = (n == "All" ? SubmissionReport.getAllUserProfiles() : SubmissionReport.getMyUsersProfiles(CurrentUser.Id));
    if (c.length == 0) {
        addMessage("You have no subordinates assigned (go to Administration->User Profiles).", "warning")
    }
    var a = SubmissionReport.getTimesheets();
    var b = {};
    $.each(a, function () {
        b[this.RequesterId] = this
    });
    $.each(c, function () {
        this.IsCreated = (String(this.UserId) in b ? true : false);
        if (this.IsCreated) {
            this.Created = b[this.UserId].Created
        }
        this.Status = (this.IsCreated == true ? b[this.UserId].Status : "");
        this.IsSubmitted = (this.IsCreated == true && isEmpty(this.Status) == false && this.Status != "Draft");
        this.TotalHours = (this.IsCreated == true ? b[this.UserId].TotalHours : "")
    });
    $("#TimesheetStatus").jtable({
        title: "Submissions Report",
        paging: false,
        sorting: false,
        pageSize: 1000,
        defaultSorting: "Total desc",
        actions: {
            listAction: function (i, d) {
                return {
                    Result: "OK",
                    Records: c
                }
            }
        },
        fields: {
            UserName: {
                title: "User",
                width: "21%",
            },
            IsCreated: {
                title: "Timesheet Created?",
                width: "16%",
                display: function (d) {
                    if (d.record.IsCreated == false) {
                        return '<font color="red">No</font>'
                    } else {
                        return '<font color="green">Yes</font>'
                    }
                }
            },
            IsSubmitted: {
                title: "Timesheet Submitted?",
                width: "16%",
                display: function (d) {
                    if (d.record.IsSubmitted == false) {
                        return '<font color="red">No</font>'
                    } else {
                        return '<font color="green">Yes</font>'
                    }
                }
            },
            Created: {
                title: "Created date",
                width: "12%",
                display: function (d) {
                    if (d.record.IsCreated == true) {
                        var i = moment(d.record.Created);
                        if (i.isValid()) {
                            return i.format(commonDateFormat2)
                        }
                    } else {
                        return ""
                    }
                }
            },
            Status: {
                title: "Status",
                width: "15%"
            },
            TotalHours: {
                title: "Total Hours",
                width: "13%"
            }
        }
    });
    $("#TimesheetStatus").jtable("load")
});
