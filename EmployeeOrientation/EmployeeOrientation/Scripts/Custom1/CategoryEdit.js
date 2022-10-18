"use strict";
var CategoryEdit = window.CategoryEdit || {};
CategoryEdit = function () {
    var b = function () {
        var e = "";
        $.ajax({
            url: appweburl + "/_api/contextinfo",
            method: "POST",
            async: false,
            headers: {
                Accept: "application/json; odata=verbose"
            },
            cache: false,
            success: function (f) {
                e = f.d.GetContextWebInformation.FormDigestValue
            },
            error: function (f, g, h) {
                alert(h)
            }
        });
        return e
    }
        , c = function (e) {
            var f;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/Categories?$select=Id,Title,IsActive&$filter=Id eq " + e,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (g) {
                    f = g.d.results[0]
                },
                error: function (g, h, i) {
                    alert(i)
                }
            });
            return f
        }
        , a = function (g, f) {
            var e = b();
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Categories')/items",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "POST",
                data: JSON.stringify({
                    __metadata: {
                        type: "SP.Data.CategoriesListItem"
                    },
                    Title: g,
                    IsActive: f,
                   // HideFromDelve: true
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": e
                },
                success: function (h) {
                    location.href = "CategoriesList.html"
                },
                error: function (j, h, i) {
                    alert(i)
                }
            })
        }
        , d = function (f, h, g) {
            var e = b();
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Categories')/getItemByStringId('" + f + "')",
                type: "POST",
                async: false,
                contentType: "application/json;odata=verbose",
                data: JSON.stringify({
                    __metadata: {
                        type: "SP.Data.CategoriesListItem"
                    },
                    Title: h,
                    IsActive: g
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "X-RequestDigest": e,
                    "X-Http-Method": "PATCH",
                    "IF-MATCH": "*"
                },
                success: function (i) {
                    location.href = "CategoriesList.html"
                },
                error: function (k, i, j) {
                    alert(j)
                }
            })
        };
    return {
        getItem: c,
        createItem: a,
        updateItem: d
    }
}();
$(document).ready(function () {
    if (CurrentUser.IsAdmin == false) {
        location.href = "AccessDenied.aspx";
        return
    }
    var b;
    var c = getQueryStringParameter("ID");
    if (typeof c == "undefined") {
        b = "Create"
    } else {
        if ($.isNumeric(c) == true) {
            b = "Edit";
            $("#title").text("Edit category");
            $("#h1").text("Edit category");
            var a = CategoryEdit.getItem(c);
            if (a == null) {
                location.href = "NotFound.aspx";
                return
            }
            $("#txtTitle").val(a.Title);
            $("#chbIsActive").prop("checked", a.IsActive)
        } else {
            location.href = "NotFound.aspx";
            return
        }
    }
    $("#btnCancel").click(function () {
        location.href = "CategoriesList.html"
    });
    $("#CategoryEdit").submit(function (d) {
        if ($("#CategoryEdit").valid()) {
            d.preventDefault();
            if (b == "Create") {
                CategoryEdit.createItem($("#txtTitle").val().StripTags(), $("#chbIsActive").prop("checked"))
            } else {
                if (b == "Edit") {
                    CategoryEdit.updateItem(c, $("#txtTitle").val().StripTags(), $("#chbIsActive").prop("checked"))
                }
            }
        }
    });
    jQuery("#CategoryEdit").validate({
        ignore: ".ignore",
        rules: {
            txtTitle: {
                required: true,
                maxlength: 250
            },
        },
        highlight: function (d) {
            jQuery(d).closest(".control-group").addClass("error")
        },
        success: function (d) {
            jQuery(d).closest(".control-group").removeClass("error")
        }
    })
});
