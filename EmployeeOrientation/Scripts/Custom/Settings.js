"use strict";
var Settings = window.Settings || {};
Settings = function () {
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
        , a = function () {
            var e;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/UserRoles/?&$select=Employee&$expand=Employee",
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                async: false,
                cache: false,
                success: function (f) {
                    e = f.d.results
                }
            });
            return e
        }
        , c = function () {
            var e;
            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/Settings?$select=Id,Title,AppCategory,NumberOfApprovers,EnableAttachments,CustomFieldsSchema,CustomSheetFieldsSchema,ManagersIDs,ApproversIDs,PeriodType,WeekNumbering,ApprovalType,ProjectsEnabled,TitleEnabled,CategoryEnabled,NumberOfDecimalPlaces,BillableHours,BillingAmount,HourlyRate,CurrencySymbol,RequestOnBehalf,AppLogo,AppLogoFile,DateFieldsMode,PreventDuplicate,MaxHours,MinHours,EditingPendingApproval,EnteringFutureTimesheets,EditingApproved,DailyTotals",
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                dataType: "json",
                cache: false,
                async: false,
                success: function (f) {
                    e = f.d.results[0]
                },
                error: function (f, g, h) {
                    alert(h)
                }
            });
            return e
        }
        , d = function (f) {
            var e = b();
            var g;
            return $.Deferred(function (h) {
                $.ajax({
                    url: appweburl + "/_api/Web/lists/getbytitle('Settings')/getItemByStringId('" + f.Id + "')",
                    type: "POST",
                    async: false,
                    contentType: "application/json;odata=verbose",
                    data: JSON.stringify({
                        __metadata: {
                            type: "SP.Data.SettingsListItem"
                        },
                        NumberOfApprovers: f.NumberOfApprovers,
                        NumberOfApproversText: f.NumberOfApproversText,
                        EnableAttachments: f.EnableAttachments,
                        CustomFieldsSchema: f.CustomFieldsSchema,
                        CustomSheetFieldsSchema: f.CustomSheetFieldsSchema,
                        ApproversIDs: f.ApproversIDs,
                        PeriodType: f.PeriodType,
                        WeekNumbering: f.WeekNumbering,
                        ApprovalType: f.ApprovalType,
                        ProjectsEnabled: f.ProjectsEnabled,
                        TitleEnabled: f.TitleEnabled,
                        CategoryEnabled: f.CategoryEnabled,
                        NumberOfDecimalPlaces: f.NumberOfDecimalPlaces,
                        BillableHours: f.BillableHours,
                        BillingAmount: f.BillingAmount,
                        HourlyRate: f.HourlyRate,
                        CurrencySymbol: f.CurrencySymbol,
                        RequestOnBehalf: f.RequestOnBehalf,
                        AppLogo: f.AppLogo,
                        DateFieldsMode: f.DateFieldsMode,
                        PreventDuplicate: f.PreventDuplicate,
                        MinHours: f.MinHours,
                        MaxHours: f.MaxHours,
                        EditingPendingApproval: f.EditingPendingApproval,
                        EditingApproved: f.EditingApproved,
                        EnteringFutureTimesheets: f.EnteringFutureTimesheets,
                        DailyTotals: f.DailyTotals
                    }),
                    headers: {
                        accept: "application/json;odata=verbose",
                        "X-RequestDigest": e,
                        "X-Http-Method": "PATCH",
                        "IF-MATCH": "*"
                    },
                    success: function (i) {
                        addMessage("Settings saved successfully", "success")
                    },
                    error: function (k, i, j) {
                        alert(j)
                    }
                })
            })
        };
    return {
        getRequestTemplate: c,
        getAllManagers: a,
        updateItem: d
    }
}();
function insertPatternAtCaret(a) {
    $("#taSubtotalFormula").caret(a)
}
$(document).ready(function () {
    if (CurrentUser.IsAdmin == false && CurrentUser.IsManager == false) {
        location.href = "AccessDenied.aspx";
        return
    }
    $("#tipAttachments").opentip("Select this option to enable adding attachments. ", {
        delay: 0
    });
    $("#tipApprovalType").opentip("<b>Auto-approved</b> - no approval process. <br/> <b>Auto-approved with email notification</b> - send notificaton to approver(s). <br/>   <b>Approvers from user profile</b> - one or two level approval workflow (depends if 2nd Approver is defined) <br/> ", {
        delay: 0
    });
    $("#tipPeriodType").opentip("Define default timesheet size: weekly, bi-weekly, monthly or semi-monthly", {
        delay: 0
    });
    $("#tipWeekNumbering").opentip("For Weekly or Bi-Weekly timesheets only: <br/>-starts Monday : week number according to the ISO-8601 standard or simple week <br/> -starts Sunday<br/>  ", {
        delay: 0
    });
    $("#tipStandardTimesheetFields").opentip("Allows to disable standard timesheet fields if not required ", {
        delay: 0
    });
    $("#tipNumberOfDecimalPlaces").opentip("Define decimal display format in timesheet", {
        delay: 0
    });
    $("#tipBillableHours").opentip("With this option enabled, users can differentiate billable/non-billable hours on timesheet", {
        delay: 0
    });
    $("#tipBillingAmount").opentip("With this option enabled, you can track project costs based on hourly rates (per user or task-based)", {
        delay: 0
    });
    $("#tipHourlyRate").opentip("<b>per User</b> - allows to define hourly rates in the User Profile <br/><b>per Task</b> - allows users to define costs per task by using <i>Hourly Rate</i> column on timesheet", {
        delay: 0
    });
    $("#tipRequestOnBehalfOf").opentip("Allows to control permission for creating new timesheet requests ", {
        delay: 0
    });
    $("#tipDateFieldsMode").opentip("<b>Pre-generated</b> - app automatically creates all date columns for given period. The user enters no. of hours in date columns.<br/><b>On-demand</b> - app creates only one date column. The user enters date in 'Date' column and no. of hours in 'Total hours' column", {
        delay: 0
    });
    $("#tipPreventDuplicate").opentip("When this option is enabled, user will be able to create only one timesheet in given period.", {
        delay: 0
    });
    $("#tipEditingPendingApproval").opentip("Allows to control permission level for editing timesheet in Pending Approval status.", {
        delay: 0
    });
    $("#tipEditingApproved").opentip("Allows to control permission level for editing timesheet in Approved status", {
        delay: 0
    });
    $("#tipEnteringFutureTimesheets").opentip("Allows to control displaying of future timeshets in drop-down list when user click on Create new", {
        delay: 0
    });
    $("#tipMaxMinHours").opentip("Allows to define the minimum or maximum number of hours that must be entered in a timesheet before it can be saved. Empty string means no validation.", {
        delay: 0
    });
    $("#tipDailyTotals").opentip("Allows to define visibility of daily totals (sum of entered hours in the particular day).", {
        delay: 0
    });
    var b;
    var c;
    var e = Settings.getRequestTemplate();
    var g = e.Id;
    if (e == null) {
        location.href = "NotFound.aspx";
        return
    }
    if (CurrentUser.IsAdmin == false) {
        location.href = "AccessDenied.aspx";
        return
    }
    $("#ddlNumberOfApprovers").val(e.NumberOfApprovers);
    $("#ddlCategory").val(e.Category);
    $("input[name='rbEnableAttachments'][value='" + e.EnableAttachments + "']").attr("checked", "checked");
    $("input[name='rbPeriodType'][value='" + e.PeriodType + "']").attr("checked", "checked");
    $("input[name='rbWeekNumbering'][value='" + e.WeekNumbering + "']").attr("checked", "checked");
    $("#ddlApprovalType").val(e.ApprovalType);
    b = $.parseJSON(e.CustomFieldsSchema);
    c = $.parseJSON(e.CustomSheetFieldsSchema);
    var f = String(e.ApproversIDs).split(",");
    if (f.length > 0) {
        $("#mchblApprovers").val(f)
    }
    if (isEmpty(e.NumberOfDecimalPlaces)) {
        e.NumberOfDecimalPlaces = "0.0"
    }
    if (isEmpty(e.DateFieldsMode)) {
        e.DateFieldsMode = "pregenerated"
    }
    $("#ddlNumberOfDecimalPlaces").val(e.NumberOfDecimalPlaces);
    $("#chbProjects").prop("checked", e.ProjectsEnabled != "false");
    $("#chbTitle").prop("checked", e.TitleEnabled != "false");
    $("#chbCategory").prop("checked", e.CategoryEnabled != "false");
    e.BillableHours = e.BillableHours == null ? false : e.BillableHours;
    e.BillingAmount = e.BillingAmount == null ? false : e.BillingAmount;
    e.HourlyRate = isEmpty(e.HourlyRate) ? "task" : e.HourlyRate;
    e.CurrencySymbol = isEmpty(e.CurrencySymbol) ? "USD" : e.CurrencySymbol;
    if (isEmpty(e.RequestOnBehalf)) {
        e.RequestOnBehalf = "admin"
    }
    $("input[name='rbRequestOnBehalf'][value='" + e.RequestOnBehalf + "']").attr("checked", "checked");
    e.AppLogo = isEmpty(e.AppLogo) ? "standard" : e.AppLogo;
    $("input[name='rbAppLogo'][value='" + e.AppLogo + "']").attr("checked", "checked");
    if (isEmpty(e.MaxHours) == false) {
        $("#txtMaxHours").val(e.MaxHours)
    }
    if (isEmpty(e.MinHours) == false) {
        $("#txtMinHours").val(e.MinHours)
    }
    $("input[name='rbBillableHours'][value='" + e.BillableHours + "']").attr("checked", "checked");
    $("input[name='rbBillingAmount'][value='" + e.BillingAmount + "']").attr("checked", "checked");
    $("input[name='rbHourlyRate'][value='" + e.HourlyRate + "']").attr("checked", "checked");
    $("#txtCurrencySymbol").val(e.CurrencySymbol);
    $("input[name='rbDateFieldsMode'][value='" + e.DateFieldsMode + "']").attr("checked", "checked");
    e.PreventDuplicate = isEmpty(e.PreventDuplicate) ? "disabled" : e.PreventDuplicate;
    $("input[name='rbPreventDuplicate'][value='" + e.PreventDuplicate + "']").attr("checked", "checked");
    if (isEmpty(e.EditingPendingApproval)) {
        e.EditingPendingApproval = "requester"
    }
    $("input[name='rbEditingPendingApproval'][value='" + e.EditingPendingApproval + "']").attr("checked", "checked");
    if (isEmpty(e.EditingApproved)) {
        e.EditingApproved = "administrator"
    }
    $("input[name='rbEditingApproved'][value='" + e.EditingApproved + "']").attr("checked", "checked");
    if (isEmpty(e.EnteringFutureTimesheets)) {
        e.EnteringFutureTimesheets = "requester"
    }
    $("input[name='rbEnteringFutureTimesheets'][value='" + e.EnteringFutureTimesheets + "']").attr("checked", "checked");
    if (isEmpty(e.DailyTotals)) {
        e.DailyTotals = "disabled"
    }
    $("input[name='rbDailyTotals'][value='" + e.DailyTotals + "']").attr("checked", "checked");
    $(".select2").select2({
        placeholder: "Select..."
    });
    if (e.BillingAmount) {
        $("#pHourlyRate").show();
        $("#pCurrencySymbol").show()
    }
    $("input[name=rbBillingAmount]:radio").change(function () {
        if (this.value == "true") {
            $("#pHourlyRate").show();
            $("#pCurrencySymbol").show()
        } else {
            $("#pHourlyRate").hide();
            $("#pCurrencySymbol").hide()
        }
    });
    var d = function (j, m, l, i, k, n, h) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        if (isEmpty(j.getDataAtProp("FieldType")[l]) == true) {
            h.readOnly = true
        } else {
            if (isEmpty(j.getDataAtProp("FieldType")[l]) == false && j.getDataAtProp("FieldType")[l] != "Choice" && j.getDataAtProp("FieldType")[l] != "Multiple Choice") {
                h.readOnly = true
            } else {
                h.readOnly = false
            }
        }
    };
    $("#divCustomFormFields").handsontable({
        data: b,
        minSpareRows: 1,
        startRows: 1,
        multiSelect: false,
        maxRows: 30,
        contextMenu: ["row_above", "row_below", "remove_row"],
        colWidths: [150, 150, 70, 300],
        colHeaders: ["Field Name", "Type", "Required", "Choice field options (comma separated)"],
        columns: [{
            data: "FieldName"
        }, {
            data: "FieldType",
            editor: "select",
            selectOptions: ["Single Line of Text", "Multiple Line of Text", "Number", "Boolean", "Choice", "Multiple Choice", "User", "Date"]
        }, {
            data: "Required",
            type: "checkbox",
            checkedTemplate: "true",
            uncheckedTemplate: "false",
            className: "handsonTableCheckbox"
        }, {
            data: "Options",
            renderer: d
        }]
    });
    $("#divCustomFormFields").data("handsontable").updateSettings({
        beforeKeyDown: function (h) {
            if (h.keyCode === 46) {
                h.stopImmediatePropagation();
                h.stopPropagation()
            }
        }
    });
    var a = function (i, h) {
        setTimeout(function () {
            if (i.indexOf(".") > -1 || i.indexOf(",") > -1) {
                h(false)
            } else {
                h(true)
            }
        }, 200)
    };
    $("#divCustomSpreadsheetFields").handsontable({
        data: c,
        minSpareRows: 1,
        startRows: 1,
        multiSelect: false,
        maxRows: 30,
        contextMenu: ["row_above", "row_below", "remove_row"],
        colWidths: [150, 100, 100, 300],
        colHeaders: ["Field Name", "Type", "Width(px)", "Choice field options (comma separated)"],
        columns: [{
            data: "FieldName",
            validator: a
        }, {
            data: "FieldType",
            editor: "select",
            selectOptions: ["Text", "Number", "Choice", "Date"]
        }, {
            data: "Width",
            editor: "select",
            selectOptions: ["50", "100", "150", "200", "250", "300", "350", "400"]
        }, {
            data: "Options",
            renderer: d
        }],
    });
    $("#Settings").submit(function (k) {
        k.preventDefault();
        var l = {};
        l.NumberOfApproversText = $("#ddlNumberOfApprovers option:selected").text();
        l.NumberOfApprovers = $("#ddlNumberOfApprovers").val();
        l.EnableAttachments = $('input[name="rbEnableAttachments"]:checked').val();
        l.PeriodType = $('input[name="rbPeriodType"]:checked').val();
        l.WeekNumbering = $('input[name="rbWeekNumbering"]:checked').val();
        l.ProjectsEnabled = $("#chbProjects").prop("checked") ? "true" : "false";
        l.TitleEnabled = $("#chbTitle").prop("checked") ? "true" : "false";
        l.CategoryEnabled = $("#chbCategory").prop("checked") ? "true" : "false";
        l.NumberOfDecimalPlaces = $("#ddlNumberOfDecimalPlaces").val();
        l.BillableHours = $('input[name="rbBillableHours"]:checked').val() == "true" ? true : false;
        l.BillingAmount = $('input[name="rbBillingAmount"]:checked').val() == "true" ? true : false;
        l.HourlyRate = $('input[name="rbHourlyRate"]:checked').val();
        l.CurrencySymbol = $("#txtCurrencySymbol").val().StripTags();
        l.RequestOnBehalf = $('input[name="rbRequestOnBehalf"]:checked').val();
        l.AppLogo = $('input[name="rbAppLogo"]:checked').val();
        l.DateFieldsMode = $('input[name="rbDateFieldsMode"]:checked').val();
        l.PreventDuplicate = $('input[name="rbPreventDuplicate"]:checked').val();
        l.MinHours = $("#txtMinHours").val();
        l.MaxHours = $("#txtMaxHours").val();
        l.EditingPendingApproval = $('input[name="rbEditingPendingApproval"]:checked').val();
        l.EditingApproved = $('input[name="rbEditingApproved"]:checked').val();
        l.EnteringFutureTimesheets = $('input[name="rbEnteringFutureTimesheets"]:checked').val();
        l.DailyTotals = $('input[name="rbDailyTotals"]:checked').val();
        if (l.AppLogo == "standard") {
            $("#logoleft").css("background-image", "url('" + appweburl + "/Images/logo.png')")
        } else {
            if (SystemSettings.AppLogoFile != "empty") {
                $("#logoleft").css("background-image", "url('" + appweburl + "/Lists/ImagesUploads/Attachments/1/" + SystemSettings.AppLogoFile + "')")
            }
        }
        l.ApprovalType = $("#ddlApprovalType").val();
        l.ApproversIDs = "";
        var m = $("#mchblApprovers").select2("data");
        if (m.length > 0) {
            $.each(m, function () {
                l.ApproversIDs += this.id + ","
            })
        }
        var i = $("#divCustomFormFields").data("handsontable").getData();
        var h = 1;
        $.each(i, function () {
            this.ColumnName = "CustomField" + String(h);
            h++
        });
        if (JSON.stringify(i) == '[{"FieldName":null,"FieldType":"","Required":null,"Options":null,"ColumnName":"CustomField1"}]' || JSON.stringify(i) == '[{"FieldName":null,"FieldType":null,"Required":null,"Options":null,"ColumnName":"CustomField1"}]') {
            l.CustomFieldsSchema = '[{"FieldName":"","FieldType":"","Required":"false","Options":"","ColumnName":"CustomField1"}]'
        } else {
            l.CustomFieldsSchema = JSON.stringify(i)
        }
        var j = $("#divCustomSpreadsheetFields").data("handsontable").getData();
        l.CustomSheetFieldsSchema = JSON.stringify(j);
        l.Id = g;
        Settings.updateItem(l)
    })
});
