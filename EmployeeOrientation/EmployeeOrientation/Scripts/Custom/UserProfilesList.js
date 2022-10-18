"use strict";
var UserProfilesList = window.UserProfilesList || {};
UserProfilesList = function () {
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
        , c = function (e, d) {
            var g;
            var f = appweburl + "/_vti_bin/ListData.svc/UserProfiles/?$inlinecount=allpages&$select=Id,User,Manager,FirstApproverId,FirstApproverName,SecondApproverId,SecondApproverName,UserName1,ManagerName,HourlyRate&$orderby=" + d.jtSorting.replace(" DESC", " desc").replace(" ASC", " asc") + "&$skip=" + d.jtStartIndex + "&$top=" + d.jtPageSize;
            return $.Deferred(function (h) {
                $.ajax({
                    url: f,
                    type: "GET",
                    headers: {
                        accept: "application/json;odata=verbose"
                    },
                    dataType: "json",
                    data: e,
                    cache: false,
                    success: function (i) {
                        g = {
                            Result: "OK",
                            Records: i.d.results,
                            TotalRecordCount: i.d.__count
                        };
                        h.resolve(g)
                    },
                    error: function () {
                        h.reject()
                    }
                })
            })
        }
        , a = function (e) {
            var d = b();
            var f;
            return $.Deferred(function (g) {
                $.ajax({
                    url: appweburl + "/_api/Web/lists/getbytitle('UserProfiles')/getItemByStringId('" + e + "')",
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
        readAll: c,
        deleteItem: a
    }
}();
$(document).ready(function () {
    if (CurrentUser.IsAdmin == false) {
        location.href = "AccessDenied.aspx";
        return
    }
    $("#UserProfiles").jtable({
        title: "User Profiles list",
        paging: true,
        pageSize: 10,
        sorting: true,
        gotoPageArea: "none",
        multiSorting: false,
        defaultSorting: "ManagerName asc",
        messages: {
            addNewRecord: "Add new request"
        },
        toolbar: {
            items: [{
                icon: "../Scripts/jtable/themes/metro/add.png",
                text: "Create new",
                click: function () {
                    location.href = "UserProfileEdit.html"
                }
            }]
        },
        actions: {
            listAction: function (b, a) {
                return UserProfilesList.readAll(b, a)
            },
            deleteAction: function (a) {
                return UserProfilesList.deleteItem(a.Id);
                $("#UserProfiles").jtable("reload")
            }
        },
        fields: {
            Id: {
                key: true,
                create: false,
                edit: false,
                list: false
            },
            UserName1: {
                title: "User",
                width: "20%"
            },
            ManagerName: {
                title: "Manager",
                width: "20%",
                sorting: true,
            },
            FirstApproverName: {
                title: "First Approver",
                width: "20%"
            },
            SecondApproverName: {
                title: "Second Approver",
                width: "20%"
            },
            HourlyRate: {
                title: "Hourly Rate (" + SystemSettings.CurrencySymbol + ")",
                width: "18%",
                visibility: SystemSettings.HourlyRate == "user" ? "fixed" : "hidden",
                sorting: false,
            },
            CustomEditAction: {
                title: "",
                listClass: "jtable-command-column",
                sorting: false,
                width: "1%",
                display: function (a) {
                    return "<button title='Edit' onclick='location.href=\"UserProfileEdit.html?ID=" + a.record.Id + "\"' class='jtable-command-button jtable-edit-command-button'><span>Edit</span></button>"
                }
            }
        }
    });
    $("#UserProfiles").jtable("load");
    $(".ui-dialog-buttonpane").find('button:contains("Save")').addClass("btn btn-primary");
    $(".ui-dialog-buttonpane").find('button:contains("Delete")').addClass("btn btn-primary");
    $(".ui-dialog-buttonpane").find('button:contains("Cancel")').addClass("btn");
    $(".ui-dialog-buttonpane").find('button:contains("Close")').addClass("btn")
});
