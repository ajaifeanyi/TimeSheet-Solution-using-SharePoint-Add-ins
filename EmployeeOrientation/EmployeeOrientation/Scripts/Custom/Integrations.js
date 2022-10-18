﻿"use strict";
var Integrations = window.Integrations || {};
Integrations = function () {
    var f = function () {
        var i = "";
        $.ajax({
            url: appweburl + "/_api/contextinfo",
            method: "POST",
            async: false,
            headers: {
                Accept: "application/json; odata=verbose"
            },
            cache: false,
            success: function (j) {
                i = j.d.GetContextWebInformation.FormDigestValue
            },
            error: function (j, k, l) {
                alert(l)
            }
        });
        return i
    }
        , e = function () {
            var i;
            $.ajax({
                url: appweburl + "/_api/SP.AppContextSite(@target)/web/lists?$select=Title&@target='" + hostweburl + "'",
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (j) {
                    i = j.d.results
                },
                error: function (l, j, k) {
                    alert(k)
                }
            });
            return i
        }
        , c = function (i, l, j) {
            var k;
            $.ajax({
                url: appweburl + "/_api/SP.AppContextSite(@target)/web/lists?@target='" + hostweburl + "'",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "POST",
                data: JSON.stringify({
                    __metadata: {
                        type: "SP.List"
                    },
                    AllowContentTypes: true,
                    BaseTemplate: 100,
                    ContentTypesEnabled: true,
                    Hidden: j,
                    OnQuickLaunch: false,
                    NoCrawl: true,
                    Description: "Contract Manager Export",
                    Title: l
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": i,
                    "If-Match": "*"
                },
                success: function (m) {
                    if (m != null) {
                        k = m.d.Id
                    }
                },
                error: function (o, m, n) {
                    alert(n)
                }
            });
            return k
        }
        , d = function (j, i) {
            $.ajax({
                url: appweburl + "/_api/SP.AppContextSite(@target)/web/lists(guid'" + j + "')?@target='" + hostweburl + "'",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "POST",
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-Http-Method": "DELETE",
                    "X-RequestDigest": i,
                    "If-Match": "*"
                },
                success: function (k) {
                    addMessage("Sharepoint list has been successfully deleted.", "success")
                },
                error: function (m, k, l) {
                    alert(l)
                }
            })
        }
        , a = function (k, l, i, j) {
            $.ajax({
                url: appweburl + "/_api/SP.AppContextSite(@target)/web/lists(guid'" + l + "')/fields?@target='" + hostweburl + "'",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "POST",
                data: JSON.stringify({
                    __metadata: {
                        type: "SP.Field"
                    },
                    FieldTypeKind: j,
                    Title: i
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": k,
                    "If-Match": "*"
                }
            })
        }
        , b = function (i, j) {
            $.ajax({
                url: appweburl + "/_api/SP.AppContextSite(@target)/web/lists(guid'" + j + "')/views?@target='" + hostweburl + "'",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "POST",
                data: JSON.stringify({
                    __metadata: {
                        type: "SP.View"
                    },
                    Title: "Integration",
                    PersonalView: false
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": i,
                    "If-Match": "*"
                }
            })
        }
        , g = function (j, i) {
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Settings')/getItemByStringId('1')",
                type: "POST",
                async: false,
                contentType: "application/json;odata=verbose",
                data: JSON.stringify({
                    __metadata: {
                        type: "SP.Data.SettingsListItem"
                    },
                    IntegrationListName: j.IntegrationListName,
                    IntegrationStatus: j.IntegrationStatus,
                    IntegrationListGuid: j.IntegrationListGuid,
                    IntegrationExportTriggers: j.IntegrationExportTriggers,
                    IntegrationStandardFields: j.IntegrationStandardFields,
                    IntegrationCustomFields: j.IntegrationCustomFields
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "X-RequestDigest": i,
                    "X-Http-Method": "PATCH",
                    "IF-MATCH": "*"
                },
                error: function (m, k, l) {
                    alert(l)
                }
            })
        }
        , h = function (j, i) {
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Settings')/getItemByStringId('1')",
                type: "POST",
                async: false,
                contentType: "application/json;odata=verbose",
                data: JSON.stringify({
                    __metadata: {
                        type: "SP.Data.SettingsListItem"
                    },
                    IntegrationStatus: j
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "X-RequestDigest": i,
                    "X-Http-Method": "PATCH",
                    "IF-MATCH": "*"
                },
                error: function (m, k, l) {
                    alert(l)
                }
            })
        };
    return {
        getFormDigestValue: f,
        getAllListsFromParent: e,
        createNewList: c,
        deleteList: d,
        updateIntegrationItem: g,
        createListField: a,
        createListView: b,
        updateIntegrationStatus: h
    }
}();
$(document).ready(function () {
    if (CurrentUser.IsAdmin == false) {
        location.href = "AccessDenied.aspx";
        return
    }
    var l = SystemSettings.IntegrationListName;
    var n = SystemSettings.IntegrationStatus;
    var k = SystemSettings.IntegrationListGuid;
    var j = SystemSettings.IntegrationExportTriggers;
    var m = SystemSettings.IntegrationStandardFields;
    var h = SystemSettings.IntegrationCustomFields;
    var b = true;
    var a = Integrations.getAllListsFromParent();
    if (isEmpty(l) == false && a != null && a.length > 0) {
        $.each(a, function () {
            if (this.Title == l) {
                b = false;
                return true
            }
        })
    }
    if (b || isEmpty(l)) {
        $("#txtListName").show();
        $("#btnSubmit").show();
        $("#pIsHidden").show();
        $("#tipListName").opentip("Sharepoint list name (only letters or numbers). ", {
            delay: 0
        });
        $("#tipTriggers").opentip("Define a set of states for which export event occurs.", {
            delay: 0
        });
        $("#tipStandardFieldsToExport").opentip("Define standard fields to export.", {
            delay: 0
        });
        $("#tipCustomFieldsToExport").opentip("Define custom fields to export.", {
            delay: 0
        });
        $("#tipIsHidden").opentip("Hidden lists are not shown in the Site Contents and Web Parts", {
            delay: 0
        })
    } else {
        $("#lblListName").show();
        $("#pIntegrationStatus").show();
        $("#aLinkURL").show();
        $("#aLinkURL").attr("href", hostweburl + "/Lists/" + l + "/Integration.html");
        $("#aLinkURL").text(l);
        if (isEmpty(n) == false) {
            $("#lblEnabled").show();
            $("#btnDisable").show()
        } else {
            $("#lblDisabled").show();
            $("#btnEnable").show()
        }
        $("#lblListName").text(l);
        $("#btnDelete").show()
    }
    if (b || isEmpty(j)) {
        $("#mchblExportTriggers").show()
    } else {
        $("#lblExportTriggers").show();
        $("#lblExportTriggers").text(j.slice(0, -1).split(",").join(", "))
    }
    if (b || isEmpty(m)) {
        $("#mchblStandardFieldsToExport").show()
    } else {
        $("#lblStandardFieldsToExport").show();
        $("#lblStandardFieldsToExport").text(m.slice(0, -1).split(",").join(", "))
    }
    if (b || (isEmpty(l) && isEmpty(h))) {
        $("#mchblCustomFieldsToExport").show();
        $("#pCustomFieldsToExport").show()
    } else {
        if (isEmpty(h) == false) {
            $("#pCustomFieldsToExport").show();
            $("#lblCustomFieldsToExport").show();
            $("#lblCustomFieldsToExport").text(h.slice(0, -1).split(",").join(", "))
        }
    }
    var e = $("#dialog-confirm-delete").dialog({
        autoOpen: false,
        resizable: false,
        height: 140,
        modal: true,
        buttons: {
            Cancel: function () {
                $(this).dialog("close")
            },
            Remove: function () {
                var i = Integrations.getFormDigestValue();
                Integrations.deleteList(k, i);
                setTimeout(function () {
                    location.href = "Integrations.html"
                }, 500);
                $(this).dialog("close")
            },
        }
    });
    $("#btnDelete").click(function () {
        e.dialog("open")
    });
    $("#btnDisable").click(function () {
        var i = Integrations.getFormDigestValue();
        Integrations.updateIntegrationStatus("", i);
        $("#lblEnabled").hide();
        $("#lblDisabled").show();
        $("#btnDisable").hide();
        $("#btnEnable").show();
        addMessage("Export to exernal Sharepoint list has been successfully disabled.", "success")
    });
    $("#btnEnable").click(function () {
        var i = Integrations.getFormDigestValue();
        Integrations.updateIntegrationStatus("true", i);
        $("#lblEnabled").show();
        $("#lblDisabled").hide();
        $("#btnDisable").show();
        $("#btnEnable").hide();
        addMessage("Export to exernal Sharepoint list has been successfully enabled.", "success")
    });
    var p = $("#mchblExportTriggers");
    p.append($("<option>", {
        value: "Draft",
        text: "Draft"
    }));
    p.append($("<option>", {
        value: "Pending Approval",
        text: "Pending Approval"
    }));
    p.append($("<option>", {
        value: "Approved",
        text: "Approved"
    }));
    p.append($("<option>", {
        value: "Rejected",
        text: "Rejected"
    }));
    var r = {
        Period: "2",
        Year: "2",
        Status: "2",
        Requester: "20",
        TotalHours: "2",
        FirstApprover: "20",
        SecondApprover: "20",
        RequestID: "1",
        RequestURL: "3",
        FirstDayOfPeriod: "2",
        TimeSheetJSON: "3",
    };
    if (SystemSettings.BillableHours) {
        r.BillableHoursAmount = "2"
    }
    if (SystemSettings.BillingAmount) {
        r.BillingAmountTotal = "2"
    }
    var q = $("#mchblStandardFieldsToExport");
    $.each(r, function (i, s) {
        q.append($("<option>", {
            value: i,
            text: i
        }))
    });
    var d = {};
    for (var g = 1; g < 31; g++) {
        var c = "CustomField" + g;
        d[c] = "3"
    }
    var o = $("#mchblCustomFieldsToExport");
    $.each(d, function (i, s) {
        o.append($("<option>", {
            value: i,
            text: i
        }))
    });
    $(".select2").select2({
        placeholder: "Select..."
    });
    $("#txtListName").val("");
    $.validator.addMethod("listNameValidator", function (s, i) {
        return /^[A-Za-z0-9]+$/i.test(s)
    }, "List name must contain only letters or numbers.");
    $.validator.addMethod("listNameValidatorUnique", function (t, s) {
        var i = true;
        if (a != null && a.length > 0) {
            $.each(a, function () {
                if (this.Title == t) {
                    i = false;
                    return true
                }
            })
        }
        return i
    }, "List name already exists, please use different name.");
    jQuery("#integrationsForm").validate({
        ignore: ".ignore",
        rules: {
            txtListName: {
                required: true,
                listNameValidator: true,
                listNameValidatorUnique: true,
                maxlength: 250
            },
            mchblExportTriggers: {
                required: true,
            },
            mchblStandardFieldsToExport: {
                required: true
            }
        },
        highlight: function (i) {
            jQuery(i).closest(".control-group").addClass("error")
        },
        success: function (i) {
            jQuery(i).closest(".control-group").removeClass("error")
        }
    });
    var f = false;
    $("#integrationsForm").submit(function (i) {
        if ($("#integrationsForm").valid()) {
            i.preventDefault();
            if (f) {
                return false
            }
            f = true;
            l = $("#txtListName").val();
            j = "";
            var v = $("#mchblExportTriggers").select2("data");
            if (v.length > 0) {
                $.each(v, function () {
                    j += this.id + ","
                })
            }
            m = "";
            var w = $("#mchblStandardFieldsToExport").select2("data");
            if (w.length > 0) {
                $.each(w, function () {
                    m += this.id + ","
                })
            }
            h = "";
            var u = $("#mchblCustomFieldsToExport").select2("data");
            if (u.length > 15) {
                f = false;
                addMessage("Too many custom fields to export.", "warning");
                return
            }
            if (u.length > 0) {
                $.each(u, function () {
                    h += this.id + ","
                })
            }
            var s = Integrations.getFormDigestValue();
            var t = Integrations.createNewList(s, l, $("#chbIsHidden").prop("checked"));
            if (isEmpty(t) == false) {
                var x = {};
                x.IntegrationListName = l;
                x.IntegrationStatus = "true";
                x.IntegrationListGuid = t;
                x.IntegrationExportTriggers = j;
                x.IntegrationStandardFields = m;
                x.IntegrationCustomFields = h;
                Integrations.updateIntegrationItem(x, s);
                $.each(w, function () {
                    if (this.id != "Title") {
                        Integrations.createListField(s, t, this.id, r[this.id])
                    }
                });
                $.each(u, function () {
                    Integrations.createListField(s, t, this.id, d[this.id])
                });
                Integrations.createListField(s, t, "HideFromDelve", "8");
                Integrations.createListView(s, t)
            }
            f = false;
            addMessage("Export list created successfully", "success");
            setTimeout(function () {
                location.href = "Integrations.html"
            }, 500)
        }
    });
    $(".ui-dialog-buttonpane").find('button:contains("Remove")').addClass("btn btn-primary");
    $(".ui-dialog-buttonpane").find('button:contains("Cancel")').addClass("btn")
});
