<%@ Page language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
       <link rel="stylesheet" href="../Content/bundle_without_tables.css" type="text/css" />
    <link rel="stylesheet" href="../Content/css/select2.css" type="text/css" />
    <link rel="stylesheet" href="../Content/jquery.loading.min.css"  />


    <script  type="text/javascript" src="../Scripts/jquery-1.10.2.js"></script>
    <script  type="text/javascript" src="../Scripts/jquery-ui-1.9.2.min.js"></script>

    <script type="text/javascript" src="../Scripts/bootstrap.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.validate.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.tagsinput.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.autogrow-textarea.js"></script>
    <script type="text/javascript" src="../Scripts/chosen.jquery.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.cookie.js"></script>
    <script type="text/javascript" src="../Scripts/modernizr.min.js"></script>
    <script type="text/javascript" src="../Scripts/elements.js"></script>
    <script type="text/javascript" src="../Scripts/prettify/prettify.js"></script>
    <script type="text/javascript" src="../Scripts/moment.min.js"></script>
    <script type="text/javascript" src="../Scripts/notify.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.loadTemplate-1.4.4.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.MultiFile.min.js"></script>
    <script type="text/javascript" src="../Scripts/select2.min.js"></script>
    <script type="text/javascript" src="../Scripts/js-expression-eval.js"></script>  
    <script type="text/javascript" src="../Scripts/jquery.loading.min.js"></script>


    <style type="text/css" >
        .hidden-cell {
            display:none;
        }

    </style>

    <!--Custom script-->
    <script type="text/javascript" src="../Scripts/Custom/Common.js"></script>
    <script type="text/javascript" src="../Scripts/Custom/FormBuilder.js"></script>
    <script type="text/javascript" src="../Scripts/Custom/RequestFormCreate.js"></script>

    
    <script src="../Scripts/handsontable.full.min.js"></script>
    <link rel="stylesheet" media="screen" href="../Content/handsontable.full.min.css" />
    <link rel="stylesheet" href="../Content/Custom/style.css" type="text/css" />
</asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
    <WebPartPages:WebPartZone runat="server" FrameType="TitleBarOnly" ID="full" Title="loc:full" />
    <div class="containerWrapper"   >      
              
    <!--Menu-->
    <div id="containerLeft" class="containerLeft"  style="float:left;width:200px;margin-top:10px; "> 

        <a href="Default.aspx"><div id="logoleft" class="mainLogo" style="background-image: url(../Images/logo.png) !important;"> </div></a>

    <div id="menuleft" class="ui-sortable ui-resizable" style="float: left; line-height: normal;">
        <div class="navigation">
            <div class="navigation-title">
                <a class="toggle-navigation" href="#">
                    <span>My Timesheets</span>
                </a>
            </div>
            <ul class="navigation-menu">
                <li class="dropdown"></li>
                <li>
                    <a href="MyRequests.aspx?status=Draft">Drafts</a>
                </li>
                <li>
                    <a href="MyRequests.aspx?status=Pending Approval">Pending Approval</a>
                </li>
                <li>
                    <a href="MyRequests.aspx?status=Rejected">Rejected</a>
                </li>
                <li>
                    <a href="MyRequests.aspx?status=Approved">Approved</a>
                </li>
            </ul>
        </div>


        <div class="navigation" id="manageRequestsPanel" style="">
            <div class="navigation-title">
                <a class="toggle-navigation" href="#">
                    <span>Team Management</span>
                </a>
            </div>
            <ul class="navigation-menu">
                <li class="dropdown"></li>
                <li>
                    <a href="ToApproveByMe.aspx">Timesheets for My Approval</a>
                </li>
                <li>
                    <a href="ReportsRequests.aspx?mode=MyTeam">My Team's Timesheets</a>
                </li>

                <li>
                    <a href="TimesheetSummary.aspx">Timesheets Summary</a>
                </li>

                <li>
                    <a href="SubmissionsReport.aspx?mode=MyTeam">Submissions Report</a>
                </li>



                <li>
                    <a href="TimesheetReport.aspx?mode=MyTeam">Total Hours Report</a>
                </li>
                <li id="linkTotalCostsReport" style="display:none;">
                    <a href="TimesheetCostReport.aspx?mode=MyTeam">Total Cost Report</a>
                </li>

                <li>
                    <a href="SubstituteApproversList.aspx?My=true">My Substitute Approver</a>
                </li>
            </ul>
        </div>
        <div class="navigation" id="adminNavPanel" style="">
            <div class="navigation-title">
                <a class="toggle-navigation" href="#">
                    <span>Administration</span>
                </a>
            </div>
            <ul class="navigation-menu">
                <li class="dropdown"></li>
                <li>
                    <a href="Settings.aspx">Settings</a>
                </li>
                <li>
                    <a href="UserRolesList.aspx">User Roles</a>
                </li>
                <li>
                    <a href="UserProfilesList.aspx">User Profiles</a>
                </li>
                <li>
                    <a href="SubstituteApproversList.aspx">Substitute Approvers</a>
                </li>
                <li>
                    <a href="ProjectsList.aspx">Projects</a>
                </li>
                <li>
                    <a href="CategoriesList.aspx">Categories</a>
                </li>
                <li>
                    <a href="EmailTemplates.aspx">Email Templates</a>
                </li>
                <li>
                    <a href="ReportsRequests.aspx?mode=All">All Timesheets</a>
                </li>
                <li>
                    <a href="Integrations.aspx">Integrations</a>
                </li>
                <li>
                    <a href="Licenses.aspx">License</a>
                </li>
                <li>
                    <a href="Help.aspx">Help</a>
                </li>

            </ul>

        </div>

    </div>
    </div>

    <!--Main Content-->
    <div id="containerRight" class="containerRight">

        <div id="topHeader" class="topHeader">
            <a href="#" id="menuExpandButton" class="menuExpandButton" data-name="hide" ><img src="../Images/menu-icon.png" /></a>
            <h1>Create New Timesheet </h1> 
        </div>

        <div id="mainContainer" style="clear:both;">

            <div class="maincontent">

                <form id="requestFormCreate" class="stdform stdform2"  method="post" >

                    <div style="margin:10px;">

                        <button id="btnSubmit" type="submit" class="btn btn-primary">Save changes</button>
                        <button id="btnCancel" type="button" class="btn">Cancel</button>

                        <div id="divValidationSummary" style="margin:5px;display:none;">
                            <label id="lblValidationSummary" class="error">Please fix the validation errors</label>
                        </div>

                    </div>


                    <div class="tabbedwidget tab-primary" id="formTabs">
                        <ul id="tabs">
                            <li><a href="#aRequestDetails">General Info</a></li>
                            <li id="liTimeSheetDetails" ><a href="#aTimeSheetDetails">TimeSheet Details</a></li>
                            <li id="liAttachments" ><a href="#aAttachments">Attachments</a></li>
                        </ul>
                        <div id="aRequestDetails">
                            <p class="control-group">
                                <label>Period</label>
                                <span class="field"><span id="lblPeriod" class="sLabel"></span> </span>
                            </p>
                            <p class="control-group">
                                <label>User Name</label>
                                <span class="field">
                                    <span id="lblRequesterName" class="sLabel" style="display:none;"></span>
                                    <select id="ddlUser"  name="ddlUser" class="select2" style="display:none;" >  <option value="" >Select...</option></select> 
                                </span>
                                 
                           </p>

                        </div>
                      
                        
                        <div id="aTimeSheetDetails">

                            <p class="control-group">
                                <span style="display:block;clear:both;">
                                    <label id="lblTimeSheetError" class="error" style="display:none;">Please fill timesheet (the total hours must be greater than zero)</label>
                                </span>

                                 <label id="lblTotalHours" style="width:220px;padding-bottom:10px;"></label> 
                                 <label id="lblBillableHours" style="width:180px;display:none;padding-bottom:10px;"></label>
                                 <label id="lblBillingAmountTotal" style="width:240px;display:none;padding-bottom:10px;"></label>

                                 <table id="tDaysSummary" style="clear:both;border-collapse: collapse;padding-top:15px;display:none;" >
                                     <tr id="trDaysSummary">
                                     </tr>
                                 </table>
                                <div id="divTimeSheet" style="clear:both;text-align:left;"></div>
                                



                                <label style="font-size:11px; font-weight:normal; border:0px; cursor:auto;" >Notice: use dot (.) as decimal separator</label>

                            </p>

                        </div>

                         <div id="aAttachments">

                            <input type="file"  id="fileUpload" />

                        </div>


                    </div><!--tabbedwidget-->

                    <div style="width:100%;clear:both;height:50px;"></div>
                    <input type="hidden" id="hdnTotalHours" />
                    <input type="hidden" id="hdnBillableHours" />
                    <input type="hidden" id="hdnBillingAmountTotal" />
                    
                </form>




            </div>

        </div>
    </div>
    
    </div>

<input type="hidden" id="hdnTotalCost" />

</asp:Content>
