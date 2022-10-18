"use strict";
var UserRoles = window.UserRoles || {};
UserRoles = function () {
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
        , 
        c = function (e, d) {
            var g;
            var f = appweburl + "/_vti_bin/ListData.svc/UserRoles/?$inlinecount=allpages&$select=Id,RoleName,Employee,EmployeeName&$expand=Employee&$orderby=" + d.jtSorting.replace(" DESC", " desc").replace(" ASC", " asc") + "&$skip=" + d.jtStartIndex + "&$top=" + d.jtPageSize;
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
                    url: appweburl + "/_api/Web/lists/getbytitle('UserRoles')/getItemByStringId('" + e + "')",
                    type: "DELETE",
                    headers: {
                        accept: "application/json;odata=verbose",
                        "X-RequestDigest": d,
                        "IF-MATCH": "*"
                    },
                    success: function (h) {
                        $.removeCookie("rbxc");
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
    $("#UserRoles").jtable({
        title: "User Roles list",
        paging: true,
        pageSize: 10,
        sorting: true,
        gotoPageArea: "none",
        multiSorting: true,
        defaultSorting: "RoleName asc",
        messages: {
            addNewRecord: "Add new request"
        },
        toolbar: {
            items: [{
                icon: "../Scripts/jtable/themes/metro/add.png",
                text: "Create new",
                click: function () {
                    location.href = "UserRoleCreate.html"
                }
            }]
        },
        actions: {
            listAction: function (b, a) {
                return UserRoles.readAll(b, a)
            },
            deleteAction: function (a) {
                return UserRoles.deleteItem(a.Id);
                $("#Administrators").jtable("reload")
            }
        },
        fields: {
            Id: {
                key: true,
                create: false,
                edit: false,
                list: false
            },
            Employee: {
                title: "User",
                width: "50%",
                sorting: false,
                display: function (a) {
                    if (typeof a.record.Employee != "undefined" && a.record.Employee != null) {
                        var b = isEmpty(a.record.Employee.Name) ? a.record.Employee.FirstName + " " + a.record.Employee.LastName : a.record.Employee.Name;
                        return isEmpty(b) == false ? b : a.record.EmployeeName
                    } else {
                        return a.record.EmployeeName
                    }
                }
            },
            RoleName: {
                title: "Role",
                width: "50%",
                sorting: true
            }
        }
    });
    $("#UserRoles").jtable("load");
    $(".ui-dialog-buttonpane").find('button:contains("Save")').addClass("btn btn-primary");
    $(".ui-dialog-buttonpane").find('button:contains("Delete")').addClass("btn btn-primary");
    $(".ui-dialog-buttonpane").find('button:contains("Cancel")').addClass("btn");
    $(".ui-dialog-buttonpane").find('button:contains("Close")').addClass("btn")
});
