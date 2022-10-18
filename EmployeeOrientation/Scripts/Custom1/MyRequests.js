"use strict";
var MyRequests = window.MyRequests || {};
MyRequests = function () {
    var b = function () {
        var d = "";
        $.ajax({
            url: appweburl + "/_api/contextinfo",
            method: "POST",
            async: false,
            headers: {
                Accept: "application/json; odata=verbose"
            },
            cache: false,
            success: function (e) {
                d = e.d.GetContextWebInformation.FormDigestValue
            },
            error: function (e, f, g) {
                alert(g)
            }
        });
        return d
    }
        , c = function (f, e) {
            var h;
            var j = [RequestStatusEnum.Draft.Value, RequestStatusEnum.PendingApproval.Value, RequestStatusEnum.Rejected.Value, RequestStatusEnum.Approved.Value];
            var i = getQueryStringParameter("status");
            i = i.replace("%20", " ");
            if (typeof i == "undefined" || j.indexOf(i) == -1) {
                return
            }
            var d = rowLimiterFilter + "RequesterId eq " + CurrentUser.Id + " and Status eq '" + i + "'";
            var g = appweburl + "/_vti_bin/ListData.svc/Requests/?$filter=" + d + "&$inlinecount=allpages&$select=Id,Status,Created,Period,Year,FirstDayOfPeriod,TotalHours&$orderby=" + e.jtSorting.replace(" DESC", " desc").replace(" ASC", " asc") + "&$skip=" + e.jtStartIndex + "&$top=" + e.jtPageSize;
            return $.Deferred(function (k) {
                $.ajax({
                    url: g,
                    type: "GET",
                    headers: {
                        accept: "application/json;odata=verbose"
                    },
                    dataType: "json",
                    data: f,
                    cache: false,
                    success: function (l) {
                        h = {
                            Result: "OK",
                            Records: l.d.results,
                            TotalRecordCount: l.d.__count
                        };
                        k.resolve(h)
                    },
                    error: function () {
                        k.reject()
                    }
                })
            })
        }
        , a = function (e) {
            var d = b();
            var f;
            return $.Deferred(function (g) {
                $.ajax({
                    url: appweburl + "/_api/Web/lists/getbytitle('Requests')/getItemByStringId('" + e + "')",
                    async: true,
                    type: "DELETE",
                    headers: {
                        accept: "application/json;odata=verbose",
                        "X-RequestDigest": d,
                        "IF-MATCH": "*"
                    },
                    success: function (h) {
                        f = {
                            Result: "OK"
                        };
                        g.resolve(f)
                    },
                    error: function (j, h, i) {
                        g.reject()
                    }
                })
            })
        };
    return {
        readMyRequests: c,
        deleteItem: a
    }
}();
$(document).ready(function () {
    var c = [RequestStatusEnum.Draft.Value, RequestStatusEnum.PendingApproval.Value, RequestStatusEnum.Rejected.Value, RequestStatusEnum.Approved.Value];
    var b = getQueryStringParameter("status");
    b = b.replace("%20", " ");
    if (typeof b == "undefined" || c.indexOf(b) == -1) {
        alert("Bad request ID!");
        return
    }
    var a = "Timesheets in " + (b == RequestStatusEnum.PendingApproval.Value ? "Pending approval" : b) + " status";
    if (canEditUserReport(b) == false) {
        $(function () {
            $("#MyTimeSheets").jtable({
                title: a,
                paging: true,
                pageSize: 10,
                sorting: true,
                multiSorting: true,
                defaultSorting: "Id desc",
                actions: {
                    listAction: MyRequests.readMyRequests
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
                        display: function (d) {
                            var e = moment(d.record.Created);
                            if (e.isValid()) {
                                return e.format(commonDateFormat2)
                            }
                        }
                    },
                    Period: {
                        title: "Period",
                        width: "23%",
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
                        width: "14%"
                    },
                    Status: {
                        title: "Status",
                        width: "25%"
                    },
                    CustomViewAction: {
                        title: "",
                        listClass: "jtable-command-column",
                        sorting: false,
                        width: "1%",
                        display: function (d) {
                            return "<button title='View' onclick='location.href=\"RequestFormView.html?requestID=" + d.record.Id + "\"' class='jtable-command-button jtable-view-command-button'><span>View</span></button>"
                        }
                    }
                }
            });
            $("#MyTimeSheets").jtable("load");
            $(".jtable-page-size-change").hide()
        })
    } else {
        $(function () {
            $("#MyTimeSheets").jtable({
                title: a,
                paging: true,
                pageSize: 10,
                sorting: true,
                gotoPageArea: "none",
                multiSorting: true,
                defaultSorting: "Id desc",
                actions: {
                    listAction: MyRequests.readMyRequests,
                    deleteAction: function (d) {
                        return MyRequests.deleteItem(d.Id);
                        $("#MyTimeSheets").jtable("reload")
                    }
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
                        display: function (d) {
                            var e = moment(d.record.Created);
                            if (e.isValid()) {
                                return e.format(commonDateFormat2)
                            }
                        }
                    },
                    Period: {
                        title: "Period",
                        width: "23%",
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
                        width: "14%"
                    },
                    Status: {
                        title: "Status",
                        width: "25%"
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
                            return "<button title='Edit' onclick='location.href=\"RequestFormEdit.html?requestID=" + d.record.Id + "\"' class='jtable-command-button jtable-edit-command-button'><span>Edit</span></button>"
                        }
                    }
                }
            });
            $("#MyTimeSheets").jtable("load");
            $(".jtable-page-size-change").hide()
        })
    }
});
