"use strict";
var SubstituteApproverList = window.SubstituteApproverList || {};
SubstituteApproverList = function () {
    var c = function () {
        var f = "";
        $.ajax({
            url: appweburl + "/_api/contextinfo",
            method: "POST",
            async: false,
            headers: {
                Accept: "application/json; odata=verbose"
            },
            cache: false,
            success: function (g) {
                f = g.d.GetContextWebInformation.FormDigestValue
            },
            error: function (g, h, i) {
                alert(i)
            }
        });
        return f
    }
        , d = function (f) {
            var g;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/SubstituteApprovers?$select=Id,SubstituteApprover&$expand=SubstituteApprover,&$filter=ManagerId eq " + f,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (h) {
                    g = h.d.results[0]
                },
                error: function (h, i, j) {
                    alert(j)
                }
            });
            return g
        }
        , e = function (h, g, f) {
            var j;
            var i = appweburl + "/_vti_bin/ListData.svc/SubstituteApprovers/?$inlinecount=allpages&$select=Id,Manager,SubstituteApprover,StartDate,EndDate1,IsActive1&$expand=SubstituteApprover,Manager" + (isEmpty(f) ? "" : "&$filter=ManagerId eq " + f) + "&$orderby=" + g.jtSorting.replace(" DESC", " desc").replace(" ASC", " asc") + "&$skip=" + g.jtStartIndex + "&$top=" + g.jtPageSize;
            return $.Deferred(function (k) {
                $.ajax({
                    url: i,
                    type: "GET",
                    headers: {
                        accept: "application/json;odata=verbose"
                    },
                    dataType: "json",
                    data: h,
                    cache: false,
                    success: function (l) {
                        j = {
                            Result: "OK",
                            Records: l.d.results,
                            TotalRecordCount: l.d.__count
                        };
                        totalRecordsCount = l.d.__count;
                        k.resolve(j)
                    },
                    error: function () {
                        k.reject()
                    }
                })
            })
        }
        , a = function (g) {
            var f = c();
            var h;
            return $.Deferred(function (i) {
                $.ajax({
                    url: appweburl + "/_api/Web/lists/getbytitle('SubstituteApprovers')/getItemByStringId('" + g + "')",
                    type: "DELETE",
                    headers: {
                        accept: "application/json;odata=verbose",
                        "X-RequestDigest": f,
                        "IF-MATCH": "*"
                    },
                    success: function (j) {
                        h = {
                            Result: "OK"
                        };
                        i.resolve(h)
                    },
                    error: function (l, j, k) {
                        i.reject()
                    }
                })
            })
        }
        , b = function () {
            var f;
            var g = appweburl + "/_vti_bin/ListData.svc/Departments?$select=Id,Value&$orderby=Value asc";
            $.ajax({
                url: g,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (h) {
                    f = h.d.results
                },
                error: function (h, i, j) {
                    alert(j)
                }
            });
            return f
        };
    return {
        getSubstituteApproverByManagerId: d,
        readAll: e,
        deleteItem: a,
        getDepartments: b
    }
}();
var totalRecordsCount = 0;
$(document).ready(function () {
    var a;
    var c = true;
    var b = getQueryStringParameter("My");
    if (typeof b == "undefined") {
        a = "All";
        if (CurrentUser.IsAdmin == false) {
            location.href = "AccessDenied.aspx";
            return
        }
    } else {
        a = "My";
        $("#title").text("My Substitute Approver");
        $("#h1").text("My Substitute Approver");
        var d = SubstituteApproverList.getSubstituteApproverByManagerId(CurrentUser.Id);
        if (d != null) {
            c = false
        }
        if (CurrentUser.IsAdmin == false && CurrentUser.IsManager == false) {
            location.href = "AccessDenied.aspx";
            return
        }
    }
    $("#SubstituteApprovers").jtable({
        title: (a == "All" ? "Substitute Approvers during the Manager's absence" : "Substitute Approver during my absence"),
        paging: true,
        pageSize: 10,
        sorting: true,
        gotoPageArea: "none",
        multiSorting: false,
        defaultSorting: "StartDate asc",
        messages: {
            addNewRecord: "Add new request"
        },
        toolbar: {
            items: c ? [{
                icon: "../Scripts/jtable/themes/metro/add.png",
                text: "Create new",
                hidden: true,
                click: function () {
                    location.href = "SubstituteApproverEdit.html" + (a == "My" ? "?My=true" : "")
                }
            }] : []
        },
        actions: {
            listAction: function (f, e) {
                return (a == "All" ? SubstituteApproverList.readAll(f, e, null) : SubstituteApproverList.readAll(f, e, CurrentUser.Id))
            },
            deleteAction: function (e) {
                return SubstituteApproverList.deleteItem(e.Id);
                $("#SubstituteApprovers").jtable("reload")
            }
        },
        fields: {
            Id: {
                key: true,
                create: false,
                edit: false,
                list: false
            },
            Manager: {
                title: "Manager",
                width: "20%",
                sorting: false,
                display: function (e) {
                    if (typeof e.record.Manager != "undefined" && e.record.Manager != null) {
                        return e.record.Manager.Name
                    }
                }
            },
            SubstituteApprover: {
                title: "Substitute Approver",
                width: "20%",
                sorting: false,
                display: function (e) {
                    if (typeof e.record.SubstituteApprover != "undefined" && e.record.SubstituteApprover != null) {
                        return e.record.SubstituteApprover.Name
                    }
                }
            },
            StartDate: {
                title: "Start Date",
                width: "20%",
                display: function (e) {
                    var f = moment(e.record.StartDate).utc();
                    if (f.isValid()) {
                        return f.format(commonDateFormat2)
                    }
                }
            },
            EndDate1: {
                title: "End Date",
                width: "20%",
                display: function (e) {
                    var f = moment(e.record.EndDate1).utc();
                    if (f.isValid()) {
                        return f.format(commonDateFormat2)
                    }
                }
            },
            IsActive1: {
                title: "IsActive",
                width: "20%",
                display: function (e) {
                    return (e.record.IsActive1 != null && e.record.IsActive1 == true) ? "Yes" : "No"
                }
            },
            CustomEditAction: {
                title: "",
                listClass: "jtable-command-column",
                sorting: false,
                width: "1%",
                display: function (e) {
                    return "<button title='Edit' onclick='location.href=\"SubstituteApproverEdit.html?ID=" + e.record.Id + (a == "My" ? "&My=true" : "") + "\"' class='jtable-command-button jtable-edit-command-button'><span>Edit</span></button>"
                }
            }
        }
    });
    $("#SubstituteApprovers").jtable("load");
    $(".ui-dialog-buttonpane").find('button:contains("Save")').addClass("btn btn-primary");
    $(".ui-dialog-buttonpane").find('button:contains("Delete")').addClass("btn btn-primary");
    $(".ui-dialog-buttonpane").find('button:contains("Cancel")').addClass("btn");
    $(".ui-dialog-buttonpane").find('button:contains("Close")').addClass("btn")
});
