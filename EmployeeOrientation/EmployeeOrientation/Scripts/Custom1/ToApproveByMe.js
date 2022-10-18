"use strict";

var ToApproveByMe = window.ToApproveByMe || {};

ToApproveByMe = function () {

    //private members
    var getFormDigestValue = function () {
        var formDigestValue = "";
        $.ajax({
            url: appweburl + "/_api/contextinfo",
            method: "POST",
            async: false,
            headers: { "Accept": "application/json; odata=verbose" },
            cache: false,
            success: function (data) {
                formDigestValue = data.d.GetContextWebInformation.FormDigestValue;
            },
            error: function (data, errorCode, errorMessage) {
                alert(errorMessage)
            }

        });

        return formDigestValue;
    },
        getPendingRequests = function (postData, jtParams) {

            var ret;

            var filter = rowLimiterFilter + " CurrentApproverId eq '" + CurrentUser.Id + "' and Status eq 'Pending Approval'";

            var query = appweburl + "/_vti_bin/ListData.svc/Requests/?$filter=" + filter + "&$inlinecount=allpages"
                + "&$select=Id,RequesterName,Status,Created,Period,Year,TotalHours,NumberOfApprovers,ApprovalStatus,FirstApproverId,SecondApproverId"
                + "&$orderby=" + jtParams.jtSorting.replace(' DESC', ' desc').replace(' ASC', ' asc')
                + "&$skip=" + jtParams.jtStartIndex
                + "&$top=" + jtParams.jtPageSize;



            return $.Deferred(function ($dfd) {
                $.ajax({
                    url: query,
                    type: 'GET',
                    headers: {
                        'accept': 'application/json;odata=verbose'
                    },
                    dataType: 'json',
                    data: postData,
                    cache: false,
                    success: function (data) {

                        ret = {
                            'Result': "OK",
                            'Records': data.d.results,
                            'TotalRecordCount': data.d.__count
                        };

                        $dfd.resolve(ret);
                    },
                    error: function () {

                        $dfd.reject();
                    }
                });
            });

        },
        rejectRequest = function (requestFormId, rejectReason) {

            var formDigestValue = getFormDigestValue();
            $.ajax(
                {
                    url: appweburl + "/_api/Web/lists/getbytitle('Requests')/getItemByStringId('" + requestFormId + "')",
                    contentType: 'application/json; odata=verbose',
                    async: false,
                    type: 'POST',
                    data: JSON.stringify(
                        {
                            '__metadata': {
                                'type': 'SP.Data.RequestsListItem'
                            },
                            'Status': RequestStatusEnum.Rejected.Value,
                            'RejectReason': rejectReason,
                            'SendEmailOnChange': true
                        }),
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "x-requestforceauthentication": true,
                        "X-RequestDigest": formDigestValue,
                        "X-Http-Method": "PATCH",
                        "IF-MATCH": "*"
                    },
                    success: function (data) {
                        addMessage("Request successfully rejected", "success");
                    }

                });

        },

        rejectRequestFacade = function (requestId) {


            var dialogConfirmReject = $("#dialog-confirm-reject").dialog({
                autoOpen: false,
                resizable: false,
                height: 180,
                width: 320,
                modal: true,
                buttons: {
                    "Cancel": {

                        class: 'btn', text: "Cancel", click: function () {
                            $(this).dialog("close");
                        }
                    }
                    ,
                    "Reject": {

                        class: 'btn btn-primary', text: "Reject", click: function () {
                            rejectRequest(requestId, $("#txtRejectReason").val());

                            $(this).dialog("close");

                            $('#PendingRequests').jtable('reload');
                        }


                    }

                }
            });

            dialogConfirmReject.dialog("open");
        },

        getSubstituteApproverByManagerId = function (managerId) {

            var userProfile;

            var today = moment().utc().format(commonDateFormat2);

            $.ajax({
                url: appweburl + "/_vti_bin/ListData.svc/SubstituteApprovers?$select=Id,SubstituteApprover&$expand=SubstituteApprover&$filter=IsActive eq true and ManagerId eq " + managerId + " and StartDate le datetime'" + today + "T00%3a00%3a00'  and EndDate1 ge datetime'" + today + "T00%3a00%3a00' ",
                type: 'GET',
                headers: {
                    'accept': 'application/json;odata=verbose'
                },
                dataType: 'json',
                cache: false,
                async: false,
                success: function (data) {
                    userProfile = data.d.results[0];
                },
                error: function (data, errorCode, errorMessage) {
                    alert(errorMessage)
                }
            });
            return userProfile;
        },

        getUserById = function (id) {

            var user;
            $.ajax(
                {
                    url: appweburl + "/_api/web/siteusers?$filter=Id eq " + id,
                    contentType: 'application/json; odata=verbose',
                    async: false,
                    type: 'GET',
                    headers: {
                        "accept": "application/json;odata=verbose"
                    },
                    cache: false,
                    success: function (data) {
                        user = data.d.results[0];
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        alert(thrownError);
                    }

                });

            return user;
        },
        getRequestForm = function (id) {

            var requestForm;

            var customFieldsStr = ",";
            for (var i = 1; i < 31; i++) {
                customFieldsStr += "CustomField" + i + (i < 30 ? ',' : '');
            }

            var selectFields = "$select=ID,FirstDayOfPeriod,Created,Modified,RequesterId,SecondApproverId,FirstApproverId,RequesterName,Author/Id,Author/Title,FirstApprover/Title,SecondApprover/Title,FirstApprover/Id,SecondApprover/Id,Title,Status,SchemaInstance,NumberOfApprovers,ApprovalStatus,EnableAttachments,CurrentApproverId,RejectReason,TimeSheetJSON,FirstApprover,SecondApprover,SheetSchemaInstance,TotalHours,WeekNumber,Year,FirstDayOfPeriod,NumberOfDays,Period,Year,ApprovalType,ProjectsEnabled,TitleEnabled,CategoryEnabled,NumberOfDecimalPlaces,BillableHours,BillingAmount,HourlyRate,BillableHoursAmount,BillingAmountTotal,DateFieldsMode" + customFieldsStr;


            $.ajax({
                url: appweburl + "/_api/Web/lists/getbytitle('Requests')/items?" + selectFields + "&$expand=Author/Title,FirstApprover/Title,SecondApprover/Title&$filter=ID eq " + id,
                type: 'GET',
                async: false,
                cache: false,
                headers: {
                    'accept': 'application/json;odata=verbose'
                },
                dataType: 'json',
                success: function (data) {
                    requestForm = data.d.results[0];
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(thrownError);
                }
            });

            return requestForm;
        },
        approveRequest = function (requestFormId, isFinalApproval, nextApprovalStatus, currentApproverId, isBulkApprove) {

            var jsonData;

            var formDigestValue = getFormDigestValue();

            if (isFinalApproval == true) {
                jsonData = {
                    '__metadata': {
                        'type': 'SP.Data.RequestsListItem'
                    },
                    'Status': RequestStatusEnum.Approved.Value,
                    'ApprovalStatus': String(nextApprovalStatus),
                    'RejectReason': '',
                    'SendEmailOnChange': true
                };

                if (isEmpty(SystemSettings.IntegrationStatus) == false && SystemSettings.IntegrationStatus == "true" && SystemSettings.IntegrationExportTriggers.indexOf("Approved") !== -1) {

                    var requestForm = getRequestForm(requestFormId);
                    if (requestForm != null) {
                        var JSONData = requestForm;
                        if (isEmpty(JSONData["Status"]) == false) {
                            JSONData["Status"] = "Approved";
                        }

                        createExportListItem(SystemSettings.IntegrationListName, JSONData, formDigestValue, SystemSettings.IntegrationStandardFields.split(","), SystemSettings.IntegrationCustomFields.split(","));
                    }
                }
            }
            else {

                jsonData = {
                    '__metadata': {
                        'type': 'SP.Data.RequestsListItem'
                    },
                    'ApprovalStatus': String(nextApprovalStatus),
                    'RejectReason': '',
                    'SendEmailOnChange': true
                };


                var currentSubstituteApprover = getSubstituteApproverByManagerId(currentApproverId);

                if (currentSubstituteApprover != null && currentSubstituteApprover.SubstituteApprover != null) {

                    var approverProfile = getUserById(currentSubstituteApprover.SubstituteApprover.Id)

                    currentApproverId = String(currentSubstituteApprover.SubstituteApprover.Id);

                    if (nextApprovalStatus == 1) {
                        jsonData['FirstApproverEmail'] = approverProfile.Email;
                        jsonData['FirstApproverId'] = String(currentSubstituteApprover.SubstituteApprover.Id);
                    }
                    else if (nextApprovalStatus == 2) {
                        jsonData['SecondApproverEmail'] = approverProfile.Email;
                        jsonData['SecondApproverId'] = String(currentSubstituteApprover.SubstituteApprover.Id);
                    }
                }

                jsonData['CurrentApproverId'] = String(currentApproverId);
            }


            $.ajax(
                {
                    url: appweburl + "/_api/Web/lists/getbytitle('Requests')/getItemByStringId('" + requestFormId + "')",
                    contentType: 'application/json; odata=verbose',
                    async: false,
                    type: 'POST',
                    data: JSON.stringify(jsonData),
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "x-requestforceauthentication": true,
                        "X-RequestDigest": formDigestValue,
                        "X-Http-Method": "PATCH",
                        "IF-MATCH": "*"
                    },
                    success: function (data) {

                        if (isBulkApprove == false) {

                            if (isFinalApproval) {
                                addMessage("Request successfully approved", "success");
                            }
                            else {
                                addMessage("Your approval has been sent", "success");
                            }
                        }
                    }

                });

        },
        approveRequestFacade = function (requestId, numberOfApproversStr, approvalStatusStr, firstApproverId, secondApproverId) {

            var dialogConfirmReject = $("#dialog-confirm-approve").dialog({
                autoOpen: false,
                resizable: false,
                height: 180,
                width: 320,
                modal: true,
                buttons: {
                    "Cancel": {

                        class: 'btn', text: "Cancel", click: function () {
                            $(this).dialog("close");
                        }
                    }
                    ,
                    "Approve": {

                        class: 'btn btn-primary', text: "Approve", click: function () {


                            var numberOfApprovers = parseInt(numberOfApproversStr);
                            var approvalStatusId = parseInt(approvalStatusStr);

                            var isFinalApproval = (numberOfApprovers == approvalStatusId);
                            var currentApproverId = '';

                            var nextApprovalStatus = approvalStatusId + 1;

                            if (isFinalApproval == false) {

                                if (nextApprovalStatus == 1) {
                                    currentApproverId = firstApproverId;
                                }
                                else if (nextApprovalStatus == 2 && secondApproverId) {
                                    currentApproverId = secondApproverId;
                                }
                            }

                            approveRequest(requestId, isFinalApproval, nextApprovalStatus, currentApproverId, false);


                            $(this).dialog("close");

                            $('#PendingRequests').jtable('reload');
                        }


                    }

                },
                open: function () {
                    $('.ui-dialog-buttonpane').find('button:contains("Approve")').focus();
                }
            });

            dialogConfirmReject.dialog("open");
        },
        massApprove = function (selectedRows) {

            var formDigestValue = getFormDigestValue();

            var approveCounter = 0;
            var existsCounter = 0;

            if (selectedRows.length > 0) {
                //Show selected rows


                selectedRows.each(function () {

                    var record = $(this).data('record');


                    var numberOfApprovers = parseInt(record.NumberOfApprovers);
                    var approvalStatusId = parseInt(record.ApprovalStatus);

                    var isFinalApproval = (numberOfApprovers == approvalStatusId);
                    var currentApproverId = '';

                    var nextApprovalStatus = approvalStatusId + 1;

                    if (isFinalApproval == false) {

                        if (nextApprovalStatus == 1) {
                            currentApproverId = record.FirstApproverId;
                        }
                        else if (nextApprovalStatus == 2 && record.SecondApproverId) {
                            currentApproverId = record.SecondApproverId;
                        }
                    }

                    approveRequest(String(record.Id), isFinalApproval, nextApprovalStatus, currentApproverId, true);

                    approveCounter++;

                });

                if (approveCounter > 0) {
                    addMessage(approveCounter + (approveCounter == 1 ? " request has" : " requests have") + " been successfully approved", "success");
                }


            }

        }


    //public interface
    return {
        getPendingRequests: getPendingRequests,
        rejectRequestFacade: rejectRequestFacade,
        approveRequestFacade: approveRequestFacade,
        massApprove: massApprove
    }

}();

$(document).ready(function () {

    $("#dialog-confirm-approve").dialog({
        autoOpen: false,
        open: function () {
            $('.ui-dialog-buttonpane').find('button:contains("Approve")').focus();
        }
    });

    var dialogMassApprove = $("#dialog-mass-approve").dialog({
        autoOpen: false,
        resizable: false,
        height: 180,
        width: (SystemSettings.CalendarType == "standard" ? 320 : 440),
        modal: true,
        buttons: {
            "Cancel": function () {
                $(this).dialog("close");
            }
            ,
            "Approve": function () {
                $('#containerRight').loading({
                    theme: 'light',
                    start: true
                });
                ToApproveByMe.massApprove($('#PendingRequests').jtable('selectedRows'));
                $('#containerRight').loading('stop');
                $('#PendingRequests').jtable('reload');
                $(this).dialog("close");

            },

        },
        open: function () {
            $('.ui-dialog-buttonpane').find('button:contains("Approve")').focus();
        }
    });

    $("#btnApprove").click(function (e) {
        e.preventDefault();

        var selectedRows = $('#PendingRequests').jtable('selectedRows');
        if (selectedRows.length == 0) {
            addMessage("You need to select at least one row", "warning");
        }
        else if (selectedRows.length > 50) {
            addMessage("Too many records selected. You can approve max. 50 records per single operation.", "warning");
        }
        else {
            dialogMassApprove.dialog("open");;
        }



    });


    $('#PendingRequests').jtable({
        title: '',
        paging: true,
        pageSize: 500,
        sorting: true,
        multiSorting: true,
        selecting: true,
        multiselect: true,
        selectingCheckboxes: true,
        defaultSorting: 'Id desc',
        actions: {
            listAction: ToApproveByMe.getPendingRequests

        },
        fields: {
            Id: {
                key: true,
                create: false,
                edit: false,
                list: true,
                title: 'Id',
                width: '5%'
            },
            ApprovalStatus: {
                create: false,
                edit: false,
                list: false,
                title: 'ApprovalStatus',
            },

            NumberOfApprovers: {
                create: false,
                edit: false,
                list: false,
                title: 'NumberOfApprovers',
            },
            FirstApproverId: {
                create: false,
                edit: false,
                list: false,
                title: 'ApprovalStatus',
            },
            SecondApproverId: {
                create: false,
                edit: false,
                list: false,
                title: 'NumberOfApprovers',
            },
            Created: {
                title: 'Created',
                width: '10%',
                display: function (data) {
                    var date = moment(data.record.Created);
                    if (date.isValid())
                        return date.format(commonDateFormat2);
                }
            },
            RequesterName: {
                title: 'User',
                width: '25%'
            },
            Period: {
                title: 'Period',
                width: '15%',
                display: function (data) {
                    return data.record.Period + ' ' + data.record.Year;
                }
            },

            Year: {
                title: 'Year',
                width: '10%'
            },

            TotalHours: {
                title: 'Total Hours',
                width: '15%'
            },
            Status: {
                title: 'Status',
                width: '20%'
            },
            CustomViewAction: {
                title: '',
                listClass: 'jtable-command-column',
                sorting: false,
                width: '1%',
                display: function (data) {
                    return "<button title='View' onclick='location.href=" + '"RequestFormView.html?requestID=' + data.record.Id + '"' + "' class='jtable-command-button jtable-view-command-button'><span>View</span></button>";
                }
            }



        }
    });
    $('#PendingRequests').jtable('load');

    $('.ui-dialog-buttonpane').find('button:contains("Approve")').addClass('btn btn-primary');
    $('.ui-dialog-buttonpane').find('button:contains("Cancel")').addClass('btn');



});