"use strict";
var ImportProjects = window.ImportProjects || {};
ImportProjects = function () {
    var c = function () {
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
        , a = function (e, d) {
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Projects')/items",
                contentType: "application/json; odata=verbose",
                type: "POST",
                data: JSON.stringify(e),
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": d
                }
            })
        }
        , b = function () {
            var d;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/Projects?$select=Id,Title",
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (e) {
                    d = e.d.results
                },
                error: function () {
                    console.log("error!!");
                    alert(thrownError)
                }
            });
            return d
        };
    return {
        getFormDigestValue: c,
        createRequest: a,
        getAllProjects: b
    }
}();
var spinnerLoaded = false;
$(document).ready(function () {
    if (CurrentUser.IsAdmin == false) {
        location.href = "AccessDenied.aspx";
        return
    }
    var a = ImportProjects.getAllProjects();
    var b = {};
    $.each(a, function () {
        if (isEmpty(this.Title) == false) {
            b[this.Title] = this.Title
        }
    });
    $("#btnImport").click(function () {
        $("#processingForm").loading({
            theme: "light",
            start: true
        });
        $(".handsontable th").css("background-color", "#B2D4EE");
        $(".handsontable th").css("border-right", "#B2D4EE");
        $(".handsontable th").css("border-left", "#B2D4EE");
        $(".handsontable th").css("border-top", "#B2D4EE");
        var i = $("#divImportSheet").data("handsontable").getData();
        var g = ImportProjects.getFormDigestValue();
        var h = 0;
        var f = 0;
        $.each(i, function () {
            if (isEmpty(this.Project) == false) {
                var k = this.Project in b;
                if (k == false) {
                    var j = {
                        __metadata: {
                            type: "SP.Data.ProjectsListItem"
                        },
                        Title: this.Project,
                        IsActive: true,
                        HideFromDelve: true
                    };
                    b[this.Project] = this.Project;
                    ImportProjects.createRequest(j, g);
                    h++
                } else {
                    f++
                }
                if (h >= 50) {
                    return false
                }
            }
        });
        if (h > 0) {
            setTimeout(function () {
                addMessage(h + " records has been successfully sent to import.", "success");
                $("#processingForm").loading("stop");
                $(".handsontable th").css("background-color", "#0072C6");
                $(".handsontable th").css("border-right", "#0072C6");
                $(".handsontable th").css("border-left", "#0072C6");
                $(".handsontable th").css("border-top", "#0072C6");
                e = [];
                $("#divImportSheet").data("handsontable").updateSettings({
                    data: e
                })
            }, 3000)
        } else {
            addMessage("No records to import.", "warning");
            $("#processingForm").loading("stop");
            $(".handsontable th").css("background-color", "#0072C6");
            $(".handsontable th").css("border-right", "#0072C6");
            $(".handsontable th").css("border-left", "#0072C6");
            $(".handsontable th").css("border-top", "#0072C6")
        }
        if (f > 0) {
            addMessage(f + " record(s) already exists.", "warning")
        }
    });
    var d = [];
    var c = new Object();
    c.data = "Project";
    c.title = "Project Name";
    c.width = 400;
    d.push(c);
    var e = [];
    $("#divImportSheet").handsontable({
        data: e,
        minSpareRows: 1,
        startRows: 1,
        maxRowsNumber: 50,
        className: "htCenter",
        multiSelect: false,
        contextMenu: ["row_above", "row_below", "remove_row"],
        columns: d
    })
});
