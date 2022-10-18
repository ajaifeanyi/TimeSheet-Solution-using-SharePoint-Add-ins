"use strict";
var ProjectEdit = window.ProjectEdit || {};
ProjectEdit = function () {
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
                url: appweburl + "/_vti_bin/ListData.svc/Projects?$select=Id,Title,ProjectMembersIDs,VisibilityLevel,IsActive&$filter=Id eq " + f,
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
        , a = function (j, g, i, k) {
            var h = false;
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Projects')/items?$select=ID,Title&$filter=Title eq '" + j.replace("'", "") + "'",
                type: "GET",
                async: false,
                cache: false,
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                success: function (l) {
                    if (l.d.results.length > 0) {
                        h = true
                    }
                },
                error: function (n, l, m) {
                    alert(m)
                }
            });
            if (h) {
                addMessage("Project with the same name already exists!", "warning");
                return
            }
            var f = c();
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Projects')/items",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "POST",
                data: JSON.stringify({
                    __metadata: {
                        type: "SP.Data.ProjectsListItem"
                    },
                    Title: j,
                    IsActive1: g,
                    ProjectMembersIDs: i,
                    VisibilityLevel: k,
                    HideFromDelve: true
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": f
                },
                success: function (l) {
                    location.href = "ProjectsList.html"
                },
                error: function (n, l, m) {
                    alert(m)
                }
            })
        }
        , e = function (g, k, h, j, l) {
            var i = false;
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Projects')/items?$select=ID,Title&$filter=Title eq '" + k.replace("'", "") + "' and ID ne " + g,
                type: "GET",
                async: false,
                cache: false,
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                success: function (m) {
                    if (m.d.results.length > 0) {
                        i = true
                    }
                },
                error: function (o, m, n) {
                    alert(n)
                }
            });
            if (i) {
                addMessage("Project with the same name already exists!", "warning");
                return
            }
            var f = c();
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Projects')/getItemByStringId('" + g + "')",
                type: "POST",
                async: false,
                contentType: "application/json;odata=verbose",
                data: JSON.stringify({
                    __metadata: {
                        type: "SP.Data.ProjectsListItem"
                    },
                    Title: k,
                    ProjectMembersIDs: j,
                    VisibilityLevel: l,
                    IsActive1: h,
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "X-RequestDigest": f,
                    "X-Http-Method": "PATCH",
                    "IF-MATCH": "*"
                },
                success: function (m) {
                    location.href = "ProjectsList.html"
                },
                error: function (o, m, n) {
                    alert(n)
                }
            })
        }
        , b = function () {
            var f;
            $.ajax({
                url: appweburl + "/_api/web/siteusers?$filter=substringof('SPOCrawler',Email) eq false and PrincipalType eq 1 and substringof('SPOCrawler',LoginName) eq false and substringof('SharePoint',Title) eq false and substringof('_SPO',Title) eq false and substringof('spocrwl',LoginName) eq false",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                cache: false,
                success: function (g) {
                    f = g.d.results
                },
                error: function (i, g, h) {
                    alert(h)
                }
            });
            return f
        };
    return {
        getItem: d,
        createItem: a,
        updateItem: e,
        getAllUsers: b
    }
}();
$(document).ready(function () {
    if (CurrentUser.IsAdmin == false) {
        location.href = "AccessDenied.aspx";
        return
    }
    var a = ProjectEdit.getAllUsers();
    var c = $("#mchblProjectMembers");
    $.each(a, function () {
        c.append($("<option>", {
            value: this.Id,
            text: this.Title
        }))
    });
    jQuery("#ProjectEdit").validate({
        ignore: ".ignore",
        rules: {
            txtTitle: {
                required: true,
                maxlength: 250
            },
        },
        highlight: function (g) {
            jQuery(g).closest(".control-group").addClass("error")
        },
        success: function (g) {
            jQuery(g).closest(".control-group").removeClass("error")
        }
    });
    var d;
    var f = getQueryStringParameter("ID");
    if (typeof f == "undefined") {
        d = "Create";
        $("input[name='rbVisibilityLevel'][value='']").attr("checked", "checked");
        $("input[name='rbVisibilityLevel'][value='']").prop("checked", true)
    } else {
        if ($.isNumeric(f) == true) {
            d = "Edit";
            $("#title").text("Edit project");
            $("#h1").text("Edit project");
            var b = ProjectEdit.getItem(f);
            if (b == null) {
                location.href = "NotFound.html";
                return
            }
            b.VisibilityLevel = (isEmpty(b.VisibilityLevel) ? "" : "private");
            $("input[name='rbVisibilityLevel'][value='" + b.VisibilityLevel + "']").attr("checked", "checked");
            $("input[name='rbVisibilityLevel'][value='" + b.VisibilityLevel + "']").prop("checked", true);
            if (b.VisibilityLevel == "private") {
                var e = String(b.ProjectMembersIDs).split(",");
                if (e.length > 0) {
                    $("#mchblProjectMembers").val(e)
                }
                $("#mchblProjectMembers").rules("add", {
                    required: true
                });
                $("#pProjectMembers").show()
            }
            $("#txtTitle").val(b.Title);
            $("#chbIsActive").prop("checked", b.IsActive1)
        } else {
            location.href = "NotFound.html";
            return
        }
    }
    $(".select2").select2({
        placeholder: "Select..."
    });
    $("#btnCancel").click(function () {
        location.href = "ProjectsList.html"
    });
    $("input[name=rbVisibilityLevel]:radio").change(function () {
        if ($('input[name="rbVisibilityLevel"]:checked').val() == "private") {
            $("#mchblProjectMembers").rules("add", {
                required: true
            });
            $("#pProjectMembers").show()
        } else {
            $("#mchblProjectMembers").rules("remove");
            $("#pProjectMembers").hide()
        }
    });
    $("#ProjectEdit").submit(function (g) {
        if ($("#ProjectEdit").valid()) {
            g.preventDefault();
            var j = $('input[name="rbVisibilityLevel"]:checked').val();
            var i = ",";
            if (j == "private") {
                var h = $("#mchblProjectMembers").select2("data");
                if (h.length > 0) {
                    $.each(h, function () {
                        i += this.id + ","
                    })
                }
            }
            if (d == "Create") {
                ProjectEdit.createItem($("#txtTitle").val().StripTags(), $("#chbIsActive").prop("checked"), i, j)
            } else {
                if (d == "Edit") {
                    ProjectEdit.updateItem(f, $("#txtTitle").val().StripTags(), $("#chbIsActive").prop("checked"), i, j)
                }
            }
        }
    })
});
