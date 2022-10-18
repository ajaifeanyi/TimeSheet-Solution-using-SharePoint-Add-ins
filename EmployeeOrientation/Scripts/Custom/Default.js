"use strict";
var Default = window.Default || {};
Default = function () {
    var c = function (f, e) {
        var h;
        var i = moment().subtract(7, "days").format(commonDateFormat2);
        var d = rowLimiterFilter + " RequesterId eq " + CurrentUser.Id + " and ((Statu eq 'Draft' or Statu eq 'PendingApproval') or  (Created ge datetime'" + i + "T00%3a00%3a00')   )";
        var g = appweburl + "/_vti_bin/ListData.svc/Requests/?$filter=" + d + "&$inlinecount=allpages&$select=Id,Statu,Created,FirstDayOfPeriod,Period,Year,TotalHours&$orderby=" + e.jtSorting.replace(" DESC", " desc").replace(" ASC", " asc") + "&$skip=" + e.jtStartIndex + "&$top=" + e.jtPageSize;
      
        return $.Deferred(function (j) {
            $.ajax({
                url: g,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                data: f,
                cache: false,
                success: function (k) {
                    h = {
                        Result: "OK",
                        Records: k.d.results,
                        TotalRecordCount: k.d.__count
                    };
                    j.resolve(h)
                },
                error: function () {
                    j.reject()
                }
            })
        })
    }
        , b = function (e, f) {
            var d;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/Requests/?$select=Id,Statu&$filter=" + rowLimiterFilter + " CreatedById eq " + CurrentUser.Id + " and WeekNumber eq '" + e + "'  and Year eq '" + f + "'",
                type: "GET",
                async: false,
                cache: false,
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                success: function (g) {
                    d = g.d.results[0]
                },
                error: function (i, g, h) {
                    alert(h)
                }
            });
            return d
        }
        , a = function (d, f) {
            var e;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/Requests/?$select=Id,Statu&$filter=" + rowLimiterFilter + "CreatedById eq " + CurrentUser.Id + " and Period eq '" + d + "'  and Year eq '" + f + "'",
                type: "GET",
                async: false,
                cache: false,
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                success: function (g) {
                    e = g.d.results[0]
                },
                error: function (i, g, h) {
                    alert(h)
                }
            });
            return e
        };
    return {
        getListData: c,
        getCurrentWeekForCurrentUser: b,
        getCurrentMonthForCurrentUser: a
    }
}();
function GoToUrl(a) {
    location.href = "RequestFormCreate.html?firstDayOfPeriod=" + a
}
function GoToUrlOnBehalf(a) {
    location.href = "RequestFormCreate.html?firstDayOfPeriod=" + a + "&onBehalfOf=true"
}
$(function () {
    if (CurrentUser.IsAdmin || CurrentUser.IsManager) {
        $(".tileApprove").show()
    }
    if (CurrentUser.IsAdmin || (CurrentUser.IsManager && SystemSettings.RequestOnBehalf == "manager")) {
        $("#divTileCreateOnBehalf").show()
    }
    $("#divEdit").click(function () {
        if (SystemSettings.PeriodType == "Weekly" || SystemSettings.PeriodType == "Bi-Weekly") {
            var i;
            if (SystemSettings.WeekNumbering == "ISO") {
                i = moment().startOf("isoWeek").isoWeek()
            } else {
                if (SystemSettings.WeekNumbering == "Sunday") {
                    i = moment().startOf("week").isoWeekday(7).week()
                } else {
                    i = moment().startOf("isoWeek").week()
                }
            }
            var B = "";
            if (i == 53) {
                B = "53"
            } else {
                if (SystemSettings.PeriodType == "Bi-Weekly") {
                    if (isEven(i) == false) {
                        B = String(i) + "-" + String(i + 1)
                    } else {
                        B = String(i - 1) + "-" + String(i)
                    }
                } else {
                    B = String(i)
                }
            }
            var v = Default.getCurrentWeekForCurrentUser(B, moment().year());
            if (v != null) {
                if (v.Statu != "Approved" || (CurrentUser.IsAdmin || CurrentUser.IsManager)) {
                    location.href = "RequestFormEdit.html?requestID=" + v.Id
                } else {
                    addMessage("Cannot edit approved timesheet.", "warning");
                    return
                }
            } else {
                var x = (SystemSettings.WeekNumbering == "Sunday" ? moment().startOf("week").isoWeekday(7) : moment().startOf("isoWeek"));
                location.href = "RequestFormCreate.html?firstDayOfPeriod=" + x.format(commonDateFormat2)
            }
        } else {
            if (SystemSettings.PeriodType == "Monthly") {
                var v = Default.getCurrentMonthForCurrentUser(moment().format("MMMM"), moment().year());
                if (v != null) {
                    if (v.Statu != "Approved" || (CurrentUser.IsAdmin || CurrentUser.IsManager)) {
                        location.href = "RequestFormEdit.html?requestID=" + v.Id
                    } else {
                        addMessage("Cannot edit approved timesheet.", "warning");
                        return
                    }
                } else {
                    var w = moment().startOf("month");
                    location.href = "RequestFormCreate.html?firstDayOfPeriod=" + w.format(commonDateFormat2)
                }
            } else {
                if (SystemSettings.PeriodType == "Semi-Monthly") {
                    var A = moment();
                    var y = "";
                    var z = "";
                    if ((moment().date() <= 15)) {
                        y = "1-15 " + A.format("MMMM");
                        z = A.year() + "-" + A.format("MM") + "-01"
                    } else {
                        y = "16-" + A.endOf("month").date() + " " + A.format("MMMM");
                        z = A.year() + "-" + A.format("MM") + "-16"
                    }
                    var v = Default.getCurrentMonthForCurrentUser(y, moment().year());
                    if (v != null) {
                        if (v.Statu != "Approved" || (CurrentUser.IsAdmin || CurrentUser.IsManager)) {
                            location.href = "RequestFormEdit.html?requestID=" + v.Id
                        } else {
                            addMessage("Cannot edit approved timesheet.", "warning");
                            return
                        }
                    } else {
                        location.href = "RequestFormCreate.html?firstDayOfPeriod=" + z
                    }
                }
            }
        }
    });
    $("#TimeSheets").jtable({
        title: "My current timesheets",
        paging: true,
        pageSize: 10,
        sorting: true,
        gotoPageArea: "none",
        multiSorting: false,
        defaultSorting: "Id desc",
        actions: {
            listAction: Default.getListData
        },
        fields: {
            Id: {
                key: true,
                create: false,
                edit: false,
                list: true,
                title: "Id",
                width: "7%"
            },
            Created: {
                title: "Created",
                width: "20%",
                display: function (i) {
                    var v = moment(i.record.Created);
                    if (v.isValid()) {
                        return v.format(commonDateFormat2)
                    }
                }
            },
            Period: {
                title: "Period",
                width: "20%",
                display: function (i) {
                    return i.record.Period + " " + i.record.Year
                }
            },
            FirstDayOfPeriod: {
                title: "Period Start",
                width: "13%"
            },
            TotalHours: {
                title: "Total Hours",
                width: "14%"
            },
            Statu: {
                title: "Status",
                width: "28%"
            },
            CustomViewAction: {
                title: "",
                listClass: "jtable-command-column",
                sorting: false,
                width: "1%",
                display: function (i) {
                    return "<button title='View' onclick='location.href=\"RequestFormView.html?requestID=" + i.record.Id + "\"' class='jtable-command-button jtable-view-command-button'><span>View</span></button>"
                }
            }
        }
    });
    $("#TimeSheets").jtable("load");
    $(".jtable-page-size-change").hide();
    if (SystemSettings.PeriodType == "Monthly") {
        var b = moment().startOf("month");
        var c = b.format("MMMM") + " " + moment().year();
        if (SystemSettings.EnteringFutureTimesheets == "enabled") {
            for (var l = 0; l < 1; l++) {
                var r = moment(b).add(1, "months");
                var t = r.format("MMMM") + " " + r.year();
                $("#ulContextMenu").append('<li><a class="dropdown-menu-link" onclick="GoToUrl(\'' + encodeURI(r.format(commonDateFormat2)) + '\')" +  tabindex="-1">' + t + "</a></li>");
                $("#ulContextMenuOnBehalf").append('<li><a class="dropdown-menu-link" onclick="GoToUrlOnBehalf(\'' + encodeURI(r.format(commonDateFormat2)) + '\')" +  tabindex="-1">' + t + "</a></li>")
            }
        }
        $("#ulContextMenu").append('<li><a class="dropdown-menu-link" onclick="GoToUrl(\'' + encodeURI(b.format(commonDateFormat2)) + '\')" +  tabindex="-1">' + c + "</a></li>");
        $("#ulContextMenuOnBehalf").append('<li><a class="dropdown-menu-link" onclick="GoToUrlOnBehalf(\'' + encodeURI(b.format(commonDateFormat2)) + '\')" +  tabindex="-1">' + c + "</a></li>");
        for (var l = 1; l < 24; l++) {
            var r = b.subtract(1, "months");
            var t = r.format("MMMM") + " " + r.year();
            $("#ulContextMenu").append('<li><a class="dropdown-menu-link" onclick="GoToUrl(\'' + encodeURI(r.format(commonDateFormat2)) + '\')" +  tabindex="-1">' + t + "</a></li>");
            $("#ulContextMenuOnBehalf").append('<li><a class="dropdown-menu-link" onclick="GoToUrlOnBehalf(\'' + encodeURI(r.format(commonDateFormat2)) + '\')" +  tabindex="-1">' + t + "</a></li>")
        }
    } else {
        if (SystemSettings.PeriodType == "Weekly") {
            var f = (SystemSettings.WeekNumbering == "Sunday" ? moment().startOf("week").isoWeekday(7) : moment().startOf("isoWeek"));
            var d = (SystemSettings.WeekNumbering == "Sunday" ? moment().endOf("week").isoWeekday(6) : moment().endOf("isoWeek"));
            if (SystemSettings.EnteringFutureTimesheets == "enabled") {
                for (var l = 0; l < 2; l++) {
                    var r = (SystemSettings.WeekNumbering == "Sunday" ? moment().add(2 - l, "weeks").startOf("week").isoWeekday(7) : moment().add(2 - l, "weeks").startOf("isoWeek"));
                    var h = (SystemSettings.WeekNumbering == "Sunday" ? moment().add(2 - l, "weeks").endOf("week").isoWeekday(6) : moment().add(2 - l, "weeks").endOf("isoWeek"));
                    var s = (SystemSettings.WeekNumbering == "ISO" ? r.isoWeek() : r.week());
                    var t = "Week " + s + " (" + r.format(commonDateFormat2) + " - " + h.format(commonDateFormat2) + ")";
                    $("#ulContextMenu").append('<li><a class="dropdown-menu-link" onclick="GoToUrl(\'' + encodeURI(r.format(commonDateFormat2)) + '\')" +  tabindex="-1">' + t + "</a></li>");
                    $("#ulContextMenuOnBehalf").append('<li><a class="dropdown-menu-link" onclick="GoToUrlOnBehalf(\'' + encodeURI(r.format(commonDateFormat2)) + '\')" +  tabindex="-1">' + t + "</a></li>")
                }
            }
            var g = "Current Week  (" + f.format(commonDateFormat2) + " - " + d.format(commonDateFormat2) + ")";
            $("#ulContextMenu").append('<li><a class="dropdown-menu-link" onclick="GoToUrl(\'' + encodeURI(f.format(commonDateFormat2)) + '\')" +  tabindex="-1">' + g + "</a></li>");
            $("#ulContextMenuOnBehalf").append('<li><a class="dropdown-menu-link" onclick="GoToUrlOnBehalf(\'' + encodeURI(f.format(commonDateFormat2)) + '\')" +  tabindex="-1">' + g + "</a></li>");
            for (var l = 1; l < 44; l++) {
                var r = (SystemSettings.WeekNumbering == "Sunday" ? moment().subtract(l, "weeks").startOf("week").isoWeekday(7) : moment().subtract(l, "weeks").startOf("isoWeek"));
                var h = (SystemSettings.WeekNumbering == "Sunday" ? moment().subtract(l, "weeks").endOf("week").isoWeekday(6) : moment().subtract(l, "weeks").endOf("isoWeek"));
                var s = (SystemSettings.WeekNumbering == "ISO" ? r.isoWeek() : r.week());
                var t = "Week " + s + " (" + r.format(commonDateFormat2) + " - " + h.format(commonDateFormat2) + ")";
                $("#ulContextMenu").append('<li><a class="dropdown-menu-link" onclick="GoToUrl(\'' + encodeURI(r.format(commonDateFormat2)) + '\')" +  tabindex="-1">' + t + "</a></li>");
                $("#ulContextMenuOnBehalf").append('<li><a class="dropdown-menu-link" onclick="GoToUrlOnBehalf(\'' + encodeURI(r.format(commonDateFormat2)) + '\')" +  tabindex="-1">' + t + "</a></li>")
            }
        } else {
            if (SystemSettings.PeriodType == "Semi-Monthly") {
                var a = moment().format("MMMM");
                var r = moment().startOf("month");
                if (SystemSettings.EnteringFutureTimesheets == "enabled") {
                    r = moment().add(1, "month").startOf("month")
                }
                for (var l = 1; l < 14; l++) {
                    if (l > 1 || (moment().date() >= 15)) {
                        var q = "16-" + r.endOf("month").date() + " " + r.format("MMMM") + " " + r.year();
                        var p = r.year() + "-" + r.format("MM") + "-16";
                        $("#ulContextMenu").append('<li><a class="dropdown-menu-link" onclick="GoToUrl(\'' + encodeURI(p) + '\')" +  tabindex="-1">' + q + "</a></li>");
                        $("#ulContextMenuOnBehalf").append('<li><a class="dropdown-menu-link" onclick="GoToUrlOnBehalf(\'' + encodeURI(p) + '\')" +  tabindex="-1">' + q + "</a></li>")
                    }
                    var k = "1-15 " + r.format("MMMM") + " " + r.year();
                    var j = r.year() + "-" + r.format("MM") + "-01";
                    $("#ulContextMenu").append('<li><a class="dropdown-menu-link" onclick="GoToUrl(\'' + encodeURI(j) + '\')" +  tabindex="-1">' + k + "</a></li>");
                    $("#ulContextMenuOnBehalf").append('<li><a class="dropdown-menu-link" onclick="GoToUrlOnBehalf(\'' + encodeURI(j) + '\')" +  tabindex="-1">' + k + "</a></li>");
                    r = r.subtract(1, "months")
                }
            } else {
                if (SystemSettings.PeriodType == "Bi-Weekly") {
                    var u = (SystemSettings.WeekNumbering == "Sunday" ? moment().startOf("week").isoWeekday(7) : moment().startOf("isoWeek"));
                    var e;
                    if (SystemSettings.WeekNumbering == "ISO") {
                        e = moment().startOf("isoWeek").isoWeek()
                    } else {
                        if (SystemSettings.WeekNumbering == "Sunday") {
                            e = moment().startOf("week").isoWeekday(7).week()
                        } else {
                            e = moment().startOf("isoWeek").week()
                        }
                    }
                    if (SystemSettings.EnteringFutureTimesheets == "enabled") {
                        var n = (SystemSettings.WeekNumbering == "Sunday" ? moment().add(1, "weeks").startOf("week").isoWeekday(7) : moment().add(1, "weeks").startOf("isoWeek"));
                        var o = (SystemSettings.WeekNumbering == "ISO" ? n.isoWeek() : n.week());
                        if (isEven(o) == true) {
                            n = (SystemSettings.WeekNumbering == "Sunday" ? moment().add(2, "weeks").startOf("week").isoWeekday(7) : moment().add(2, "weeks").startOf("isoWeek"));
                            o = (SystemSettings.WeekNumbering == "ISO" ? n.isoWeek() : n.week());
                            var m = (SystemSettings.WeekNumbering == "Sunday" ? moment().add(3, "weeks").endOf("week").isoWeekday(6) : moment().add(3, "weeks").endOf("isoWeek"));
                            var t = "Weeks " + o + "-" + (o + 1) + " (" + n.format(commonDateFormat2) + " - " + m.format(commonDateFormat2) + ")";
                            $("#ulContextMenu").append('<li><a class="dropdown-menu-link" onclick="GoToUrl(\'' + encodeURI(n.format(commonDateFormat2)) + '\')" +  tabindex="-1">' + t + "</a></li>");
                            $("#ulContextMenuOnBehalf").append('<li><a class="dropdown-menu-link" onclick="GoToUrlOnBehalf(\'' + encodeURI(n.format(commonDateFormat2)) + '\')" +  tabindex="-1">' + t + "</a></li>")
                        } else {
                            if (o != 53) {
                                var m = (SystemSettings.WeekNumbering == "Sunday" ? moment().add(2, "weeks").endOf("week").isoWeekday(6) : moment().add(2, "weeks").endOf("isoWeek"));
                                var t = "Weeks " + o + "-" + (o + 1) + " (" + n.format(commonDateFormat2) + " - " + m.format(commonDateFormat2) + ")";
                                $("#ulContextMenu").append('<li><a class="dropdown-menu-link" onclick="GoToUrl(\'' + encodeURI(n.format(commonDateFormat2)) + '\')" +  tabindex="-1">' + t + "</a></li>");
                                $("#ulContextMenuOnBehalf").append('<li><a class="dropdown-menu-link" onclick="GoToUrlOnBehalf(\'' + encodeURI(n.format(commonDateFormat2)) + '\')" +  tabindex="-1">' + t + "</a></li>")
                            } else {
                                var m = (SystemSettings.WeekNumbering == "Sunday" ? moment().add(1, "weeks").endOf("week").isoWeekday(6) : moment().add(1, "weeks").endOf("isoWeek"));
                                var t = "Week " + o + " (" + n.format(commonDateFormat2) + " - " + m.format(commonDateFormat2) + ")";
                                $("#ulContextMenu").append('<li><a class="dropdown-menu-link" onclick="GoToUrl(\'' + encodeURI(n.format(commonDateFormat2)) + '\')" +  tabindex="-1">' + t + "</a></li>");
                                $("#ulContextMenuOnBehalf").append('<li><a class="dropdown-menu-link" onclick="GoToUrlOnBehalf(\'' + encodeURI(n.format(commonDateFormat2)) + '\')" +  tabindex="-1">' + t + "</a></li>")
                            }
                        }
                    }
                    if (isEven(e)) {
                        var f = (SystemSettings.WeekNumbering == "Sunday" ? moment().subtract(1, "weeks").startOf("week").isoWeekday(7) : moment().subtract(1, "weeks").startOf("isoWeek"));
                        var d = (SystemSettings.WeekNumbering == "Sunday" ? moment().endOf("week").isoWeekday(6) : moment().endOf("isoWeek"));
                        var g = "Current Bi-Week  (" + f.format(commonDateFormat2) + " - " + d.format(commonDateFormat2) + ")";
                        $("#ulContextMenu").append('<li><a class="dropdown-menu-link" onclick="GoToUrl(\'' + encodeURI(f.format(commonDateFormat2)) + '\')" +  tabindex="-1">' + g + "</a></li>");
                        $("#ulContextMenuOnBehalf").append('<li><a class="dropdown-menu-link" onclick="GoToUrlOnBehalf(\'' + encodeURI(f.format(commonDateFormat2)) + '\')" +  tabindex="-1">' + g + "</a></li>");
                        var l = 2;
                        while (l < 64) {
                            l++;
                            var r = (SystemSettings.WeekNumbering == "Sunday" ? moment().subtract(l - 1, "weeks").startOf("week").isoWeekday(7) : moment().subtract(l - 1, "weeks").startOf("isoWeek"));
                            var s = (SystemSettings.WeekNumbering == "ISO" ? r.isoWeek() : r.week());
                            var h;
                            if (isEven(s) == false && s != 53) {
                                h = (SystemSettings.WeekNumbering == "Sunday" ? moment().subtract(l - 1, "weeks").add(1, "weeks").endOf("week").isoWeekday(6) : moment().subtract(l - 1, "weeks").add(1, "weeks").endOf("isoWeek"));
                                var t = "Weeks " + s + "-" + (s + 1) + " (" + r.format(commonDateFormat2) + " - " + h.format(commonDateFormat2) + ")";
                                $("#ulContextMenu").append('<li><a class="dropdown-menu-link" onclick="GoToUrl(\'' + encodeURI(r.format(commonDateFormat2)) + '\')" +  tabindex="-1">' + t + "</a></li>");
                                $("#ulContextMenuOnBehalf").append('<li><a class="dropdown-menu-link" onclick="GoToUrlOnBehalf(\'' + encodeURI(r.format(commonDateFormat2)) + '\')" +  tabindex="-1">' + t + "</a></li>")
                            } else {
                                if (s == 53) {
                                    h = (SystemSettings.WeekNumbering == "Sunday" ? moment().subtract(l - 1, "weeks").endOf("week").isoWeekday(6) : moment().subtract(l - 1, "weeks").endOf("isoWeek"));
                                    var t = "Week " + s + " (" + r.format(commonDateFormat2) + " - " + h.format(commonDateFormat2) + ")";
                                    $("#ulContextMenu").append('<li><a class="dropdown-menu-link" onclick="GoToUrl(\'' + encodeURI(r.format(commonDateFormat2)) + '\')" +  tabindex="-1">' + t + "</a></li>");
                                    $("#ulContextMenuOnBehalf").append('<li><a class="dropdown-menu-link" onclick="GoToUrlOnBehalf(\'' + encodeURI(r.format(commonDateFormat2)) + '\')" +  tabindex="-1">' + t + "</a></li>")
                                }
                            }
                        }
                    } else {
                        var f = (SystemSettings.WeekNumbering == "Sunday" ? moment().startOf("week").isoWeekday(7) : moment().startOf("isoWeek"));
                        if (e != 53) {
                            var d = (SystemSettings.WeekNumbering == "Sunday" ? moment().add(1, "weeks").endOf("week").isoWeekday(6) : moment().add(1, "weeks").endOf("isoWeek"));
                            var g = "Current Bi-Week  (" + f.format(commonDateFormat2) + " - " + d.format(commonDateFormat2) + ")";
                            $("#ulContextMenu").append('<li><a class="dropdown-menu-link" onclick="GoToUrl(\'' + encodeURI(f.format(commonDateFormat2)) + '\')" +  tabindex="-1">' + g + "</a></li>");
                            $("#ulContextMenuOnBehalf").append('<li><a class="dropdown-menu-link" onclick="GoToUrlOnBehalf(\'' + encodeURI(f.format(commonDateFormat2)) + '\')" +  tabindex="-1">' + g + "</a></li>")
                        } else {
                            var d = (SystemSettings.WeekNumbering == "Sunday" ? moment().endOf("week").isoWeekday(6) : moment().endOf("isoWeek"));
                            var g = "Current - Week 53  (" + f.format(commonDateFormat2) + " - " + d.format(commonDateFormat2) + ")";
                            $("#ulContextMenu").append('<li><a class="dropdown-menu-link" onclick="GoToUrl(\'' + encodeURI(f.format(commonDateFormat2)) + '\')" +  tabindex="-1">' + g + "</a></li>");
                            $("#ulContextMenuOnBehalf").append('<li><a class="dropdown-menu-link" onclick="GoToUrlOnBehalf(\'' + encodeURI(f.format(commonDateFormat2)) + '\')" +  tabindex="-1">' + g + "</a></li>")
                        }
                        var l = 1;
                        while (l < 64) {
                            l++;
                            var r = (SystemSettings.WeekNumbering == "Sunday" ? moment().subtract(l - 1, "weeks").startOf("week").isoWeekday(7) : moment().subtract(l - 1, "weeks").startOf("isoWeek"));
                            var s = (SystemSettings.WeekNumbering == "ISO" ? r.isoWeek() : r.week());
                            var h;
                            if (isEven(s) == false && s != 53) {
                                h = (SystemSettings.WeekNumbering == "Sunday" ? moment().subtract(l - 1, "weeks").add(1, "weeks").endOf("week").isoWeekday(6) : moment().subtract(l - 1, "weeks").add(1, "weeks").endOf("isoWeek"));
                                var t = "Weeks " + s + "-" + (s + 1) + " (" + r.format(commonDateFormat2) + " - " + h.format(commonDateFormat2) + ")";
                                $("#ulContextMenu").append('<li><a class="dropdown-menu-link" onclick="GoToUrl(\'' + encodeURI(r.format(commonDateFormat2)) + '\')" +  tabindex="-1">' + t + "</a></li>");
                                $("#ulContextMenuOnBehalf").append('<li><a class="dropdown-menu-link" onclick="GoToUrlOnBehalf(\'' + encodeURI(r.format(commonDateFormat2)) + '\')" +  tabindex="-1">' + t + "</a></li>")
                            } else {
                                if (s == 53) {
                                    h = (SystemSettings.WeekNumbering == "Sunday" ? moment().subtract(l - 1, "weeks").endOf("week").isoWeekday(6) : moment().subtract(l - 1, "weeks").endOf("isoWeek"));
                                    var t = "Week " + s + " (" + r.format(commonDateFormat2) + " - " + h.format(commonDateFormat2) + ")";
                                    $("#ulContextMenu").append('<li><a class="dropdown-menu-link" onclick="GoToUrl(\'' + encodeURI(r.format(commonDateFormat2)) + '\')" +  tabindex="-1">' + t + "</a></li>");
                                    $("#ulContextMenuOnBehalf").append('<li><a class="dropdown-menu-link" onclick="GoToUrlOnBehalf(\'' + encodeURI(r.format(commonDateFormat2)) + '\')" +  tabindex="-1">' + t + "</a></li>")
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    $("#divTileCreate").attr("data-toggle", "context");
    $("#divTileCreate").attr("data-target", "#context-menu");
    $("#divTileCreateOnBehalf").attr("data-toggle", "context");
    $("#divTileCreateOnBehalf").attr("data-target", "#context-menu-on-behalf")
});
