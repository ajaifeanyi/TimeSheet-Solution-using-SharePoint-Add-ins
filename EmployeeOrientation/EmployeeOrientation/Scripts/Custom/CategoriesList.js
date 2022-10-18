"use strict";
var CategoriesList = window.CategoriesList || {};
CategoriesList = function () {
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
            var f = appweburl + "/_vti_bin/ListData.svc/Categories?$inlinecount=allpages&$select=Id,Title,IsActive&$orderby=" + d.jtSorting.replace(" DESC", " desc").replace(" ASC", " asc") + "&$skip=" + d.jtStartIndex + "&$top=" + d.jtPageSize;
            return $.Deferred(function (h) {
                $.ajax({
                    url: f,
                    type: "GET",
                    headers: {
                        accept: "application/json;odata=verbose"
                    },
                    dataType: "json",
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
                    url: appweburl + "/_api/Web/lists/getbytitle('Categories')/getItemByStringId('" + e + "')",
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
    $("#Categories").jtable({
        title: "Categories list",
        paging: true,
        defaultSorting: "IsActive desc",
        sorting: true,
        messages: {
            addNewRecord: "Add new"
        },
        toolbar: {
            items: [{
                icon: "../Scripts/jtable/themes/metro/add.png",
                text: "Create new",
                click: function () {
                    location.href = "CategoryEdit.html"
                }
            }]
        },
        actions: {
            listAction: CategoriesList.readAll,
            deleteAction: function (a) {
                return CategoriesList.deleteItem(a.Id);
                $("#Categories").jtable("reload")
            }
        },
        fields: {
            Id: {
                key: true,
                create: false,
                edit: false,
                list: false,
            },
            Title: {
                list: true,
                title: "Title",
                width: "80%"
            },
            IsActive: {
                list: true,
                title: "Is Active",
                width: "15%",
                display: function (a) {
                    return a.record.IsActive ? "Yes" : "No"
                }
            },
            CustomEditAction: {
                title: "",
                listClass: "jtable-command-column",
                sorting: false,
                width: "1%",
                display: function (a) {
                    return "<button title='Edit' onclick='location.href=\"CategoryEdit.html?ID=" + String(a.record.Id) + "\"' class='jtable-command-button jtable-edit-command-button'><span>Edit</span></button>"
                }
            }
        }
    });
    $("#Categories").jtable("load");
    $(".ui-dialog-buttonpane").find('button:contains("Save")').addClass("btn btn-primary");
    $(".ui-dialog-buttonpane").find('button:contains("Delete")').addClass("btn btn-primary");
    $(".ui-dialog-buttonpane").find('button:contains("Cancel")').addClass("btn")
});
