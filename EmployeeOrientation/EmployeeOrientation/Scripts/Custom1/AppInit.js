"use strict";
var AppInit = window.AppInit || {};
var formDigestValue = "";
AppInit = function () {
    var e = function () {
        if (formDigestValue === "") {
            $.ajax({
                url: appweburl + "/_api/contextinfo",
                method: "POST",
                async: false,
                headers: {
                    Accept: "application/json; odata=verbose"
                },
                cache: false,
                success: function (f) {
                    formDigestValue = f.d.GetContextWebInformation.FormDigestValue;
                },
                error: function (f, g, h) {
                    alert(h);
                }
            });
        }
        return formDigestValue;
    }
        , c = function (g, h) {
            var f = e();
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('UserRoles')/items",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "POST",
                data: JSON.stringify({
                    __metadata: {
                        type: "SP.Data.UserRolesListItem"
                    },
                    RoleName: "Administrator",
                    EmployeeId: g,
                    EmployeeName: h,
                    //HideFromDelve: true
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": f
                }
            });
        }
        , b = function () {
            var f = e();
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('RequestCategories')/items",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "POST",
                data: JSON.stringify({
                    __metadata: {
                        type: "SP.Data.RequestCategoriesListItem"
                    },
                    Title: "General",
                    //HideFromDelve: true
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": f
                }
            });
        }
        , d = function (f) {
            var g = e();
            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Settings')/items",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "POST",
                data: JSON.stringify({
                    __metadata: {
                        type: "SP.Data.SettingsListItem"
                    },
                    Title: "",
                    Category: "General",
                    NumberOfApprovers: "2",
                    NumberOfApproversText: "Two Approvers",
                    EnableAttachments: true,
                   CustomFieldsSchema: '[{"FieldName":"Comments","FieldType":"Multiple Line of Text","Required":"false","Options":"","ColumnName":"CustomField1"},{"FieldName":null,"FieldType":null,"Required":null,"Options":null,"ColumnName":"CustomField2"}]',
                    CustomSheetFieldsSchema: "[{}]",
                    ManagersIDs: "," + String(f) + ",",
                    ApproversIDs: "",
                    LastLicenseCheck: "0",
                    AppInitExecuted: "true",
                    PeriodType: "Weekly",
                    WeekNumbering: "ISO",
                    ApprovalType: "Approver(s) from User Profile",
                    //HideFromDelve: true
                }),
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": g
                }
            })
        }
        , a = function () {
            var f = e();
            var g;
            $.ajax({
                url: appweburl + "/_api/web/siteusers?$filter=Title eq 'Everyone' or substringof('spo-grid-all-users',LoginName)&$select=Id",
                contentType: "application/json; odata=verbose",
                async: false,
                type: "GET",
                headers: {
                    accept: "application/json;odata=verbose"
                },
                cache: false,
                success: function (h) {
                    if (h.d.results[0] !== null) {
                        g = h.d.results[0].Id
                    }
                }
            });
            $.ajax({
                url: appweburl + "/_api/web/breakroleinheritance(copyRoleAssignments = true, clearSubscopes = true)",
                contentType: "application/json; odata=verbose",
                type: "POST",
                async: false,
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": f
                }
            });
            $.ajax({
                url: appweburl + "/_api/web/roleassignments/addroleassignment(principalid=" + g + ",roleDefId=1073741827)",
                contentType: "application/json; odata=verbose",
                type: "POST",
                async: false,
                headers: {
                    accept: "application/json;odata=verbose",
                    "x-requestforceauthentication": true,
                    "X-RequestDigest": f
                }
            });
        };
    return {
        createDefaultRequestCategoryEntry: b,
        createSettingsEntry: d,
        createRoleItemEntry: c,
        assignRoles: a
    };
}();
$(document).ready(function () {
    if (SystemSettings.AppInitExecuted === "false") {
        AppInit.assignRoles();
        AppInit.createRoleItemEntry(CurrentUser.Id, CurrentUser.Name);
        AppInit.createDefaultRequestCategoryEntry();
        AppInit.createSettingsEntry(CurrentUser.Id);
        location.href = "Default.html";
    }
});
