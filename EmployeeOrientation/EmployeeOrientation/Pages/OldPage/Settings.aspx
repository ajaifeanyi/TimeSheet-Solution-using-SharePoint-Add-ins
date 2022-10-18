<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
   
   <!-- <SharePoint:ScriptLink name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />-->
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script> 
    <script type="text/javascript" src="/_layouts/15/sp.js"></script> 
    <meta name="WebPartPageExpansion" content="full" />

   <link rel="stylesheet" href="../Content/bundle_without_tables.css" type="text/css" />
  
    <link rel="stylesheet" href="../Content/style.default.css" type="text/css" />
    <link rel="stylesheet" href="../Content/css/select2.css" type="text/css" />
    <link rel="stylesheet" href="../Content/select2-bootstrap.css" type="text/css" />

    <script src="../Scripts/jquery-1.10.2.js"></script>
    <script type="text/javascript" src="../Scripts/jquery-ui-1.9.2.min.js"></script>

    <script type="text/javascript" src="../Scripts/bootstrap.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.validate.min.js"></script>
    <script type="text/javascript" src="../Scripts/chosen.jquery.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.cookie.js"></script>
    <script type="text/javascript" src="../Scripts/modernizr.min.js"></script>
    <script type="text/javascript" src="../Scripts/elements.js"></script>
    <script type="text/javascript" src="../Scripts/prettify/prettify.js"></script>
    <script type="text/javascript" src="../Scripts/moment.min.js"></script>
    <script type="text/javascript" src="../Scripts/notify.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.loadTemplate-1.4.4.min.js"></script>
    <script type="text/javascript" src="../Scripts/select2.min.js"></script>  
    <script type="text/javascript" src="../Scripts/jquery.caret-1.5.0.min.js"></script>  
    <script type="text/javascript" src="../Scripts/js-expression-eval.js"></script>  

    <!--Custom script-->
    <script type="text/javascript" src="../Scripts/Custom/Common.js"></script>
    <script type="text/javascript" src="../Scripts/Custom/Settings.js"></script>
     <script type="text/javascript" src="../Scripts/opentip-jquery.min.js"></script> 

    <script src="../Scripts/handsontable.full.min.js"></script>
    <link rel="stylesheet" media="screen" href="../Content/handsontable.full.min.css" />
    <link rel="stylesheet" href="../Content/styles.css" type="text/css" />
    <style type="text/css">
        .stdform2 span.field, .stdform2 div.field
        {
            margin-left:290px;
        }
        .stdform label
        {
            width:290px;padding-top:10px;
            
        }
        .stdform input
        {
            border:0px;
        }
    </style>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<%-- %><asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Timesheet Plus
</asp:Content>--%>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

        <!-- The following content will be replaced with the user name when you run the app - see App.js -->

     <div class="containerWrapper">
      <!--Menu-->
    <div id="containerLeft" class="containerLeft" style="float:left;width:200px;margin-top:10px; "><div id="logoleft" class="mainLogo" style="background-image: url(../Images/logo.png) !important;"><a href="Default.aspx"> </a></div>
          
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
            <a href="#" id="menuExpandButton" class="menuExpandButton" data-name="hide" ></a>
            <h1>Settings</h1>
        </div>

        <div id="mainContainer" style="clear: both;">
             <div class="maincontent">

                <form id="Settings" class="stdform stdform2"  method="post" >

                    <div style="margin:10px;">

                        <button id="btnSubmit" type="submit" class="btn btn-primary">Save changes</button>

                        <div id="divValidationSummary" style="margin:5px;display:none;">
                            <label id="lblValidationSummary" class="error">Please fix the validation errors</label>
                        </div>

                    </div>


                    <div class="tabbedwidget tab-primary" id="formTabs" style="margin-bottom:10px;">
                        <ul id="tabs">
                            <li><a href="#aGeneralInfo">General Settings</a></li>
                            <li><a href="#aBillingSettings">Billing Settings</a></li>
                            <li><a href="#aCustomFormFields">Custom form fields</a></li>
                            <li><a href="#aCustomSpreadsheetFields">Custom timesheet fields</a></li>
                        </ul>
                        <div id="aGeneralInfo" style="width:750px">
                            

                            <p class="control-group">
                                <label>Approval Type </label>
                                <span class="field" id="tipApprovalType" >
                                    <select name="ddlApprovalType" id="ddlApprovalType"  class="input-xlarge" >
                                        <option value="">Select...</option>
                                        <option value="Auto-approved">Auto-approved</option>
                                        <option value="Auto-approved with email notification">Auto-approved with email notification</option>
                                        <option value="Approver(s) from User Profile">Approver(s) from User Profile</option>

                                     </select>
                                </span>
                            </p>      

                        

                           <p class="control-group" >
                                <label>Attachments</label>
                                <span class="field" id="tipAttachments">
                                    <input style="line-height:20px !important;height:20px !important;" type="radio" name="rbEnableAttachments" value="true"  checked="checked" /> Enabled &nbsp; &nbsp;
                            	    <input style="line-height:20px !important;height:20px !important;" type="radio" name="rbEnableAttachments" value="false"    /> Disabled 
                                </span>
                            </p>     

                            <p class="control-group" >
                                <label>Period Type</label>
                                <span class="field"  id="tipPeriodType">
                                    <input style="line-height:20px !important;height:20px !important;" type="radio" name="rbPeriodType" value="Weekly"  checked="checked" /> Weekly &nbsp; &nbsp;
                                    <input style="line-height:20px !important;height:20px !important;" type="radio" name="rbPeriodType" value="Bi-Weekly"  /> Bi-Weekly &nbsp; &nbsp;
                                    <input style="line-height:20px !important;height:20px !important;" type="radio" name="rbPeriodType" value="Semi-Monthly"    /> Semi-monthly   &nbsp; &nbsp;
                            	    <input style="line-height:20px !important;height:20px !important;" type="radio" name="rbPeriodType" value="Monthly"    /> Monthly 
                                </span>
                            </p> 
                            
                             <p class="control-group" >
                                <label>Week Type</label>
                                <span class="field"  id="tipWeekNumbering">
                                    <input style="line-height:20px !important;height:20px !important;" type="radio" name="rbWeekNumbering" value=""  checked="checked" /> Simple Week No. &nbsp; &nbsp;
                                    <input style="line-height:20px !important;height:20px !important;" type="radio" name="rbWeekNumbering" value="ISO"  /> ISO Week No. &nbsp; &nbsp;
                                    <input style="line-height:20px !important;height:20px !important;" type="radio" name="rbWeekNumbering" value="Sunday"  /> Starts Sunday&nbsp; &nbsp;

                                    

                                </span>
                            </p>  
                            
                            
                             <p class="control-group" >
                                <label >Standard Timesheet Fields</label>
                                 <span class="field" id="tipStandardTimesheetFields">
                            	    <input style="line-height:20px !important;height:20px !important;margin-right:5px;" type="checkbox" name="chbProjects" id="chbProjects"/>Projects &nbsp;&nbsp;&nbsp;
                                    <input style="line-height:20px !important;height:20px !important;margin-right:5px;" type="checkbox" name="chbTitle" id="chbTitle"/>Title &nbsp;&nbsp;&nbsp;
                                    <input style="line-height:20px !important;height:20px !important;margin-right:5px;" type="checkbox" name="chbCategory" id="chbCategory"/>Category &nbsp;&nbsp;
                                 </span>
                            </p>


                            <p class="control-group">
                                <label>Decimal Display Format </label>
                                <span class="field" id="tipNumberOfDecimalPlaces">
                                    <select name="ddl" id="ddlNumberOfDecimalPlaces"  class="input-xlarge" >
                                        <option value="0">0</option>
                                        <option value="0.0">0.0</option>
                                        <option value="0.00">0.00</option>
                                     </select>
                                </span>
                            </p>
                            
                             <p class="control-group">
                                <label>Who can create request on behalf of other? </label>
                                <span class="field" id="tipRequestOnBehalfOf">
                                    <input style="line-height:20px !important;height:20px !important;" type="radio" name="rbRequestOnBehalf" value="manager"  /> Manager and Admin &nbsp; &nbsp;
                                    <input style="line-height:20px !important;height:20px !important;" type="radio" name="rbRequestOnBehalf" value="admin"  /> Admin only &nbsp; &nbsp;
                                </span>
                            </p> 

                             <p class="control-group" >
                                <label>Date Fields Mode</label>
                                <span class="field"  id="tipDateFieldsMode">
                                    <input style="line-height:20px !important;height:20px !important;" type="radio" name="rbDateFieldsMode" value="pregenerated"  checked="checked" /> Pre-generated &nbsp; &nbsp;
                                    <input style="line-height:20px !important;height:20px !important;" type="radio" name="rbDateFieldsMode" value="ondemand"  /> On-demand &nbsp; &nbsp;
                                </span>
                            </p>  


                            <p class="control-group" >
                                <label>Prevent Duplicate Timesheets</label>
                                <span class="field"  id="tipPreventDuplicate">
                                    <input style="line-height:20px !important;height:20px !important;" type="radio" name="rbPreventDuplicate" value="enabled"  /> Enabled &nbsp; &nbsp;
                                    <input style="line-height:20px !important;height:20px !important;" type="radio" name="rbPreventDuplicate" value="disabled"  /> Disabled &nbsp; &nbsp;
                                </span>
                            </p>

                              <p class="control-group">
                                <label>Min/Max Hours Per Timesheet</label>
                                <span class="field" id="tipMaxMinHours">
                                     <span >Min </span>
                                    <input type="number" min="1" name="txtMinHours" id="txtMinHours" class="input-xlarge" style="width:50px;" />
                                    <span >Max </span>
                                    <input type="number" min="1" name="txtMaxHours" id="txtMaxHours" class="input-xlarge" style="width:50px;" />
                                </span>
                            </p> 

                            <p class="control-group" >
                                <label>Displaying Future Timesheets</label>
                                <span class="field"  id="tipEnteringFutureTimesheets">
                                    <input style="line-height:20px !important;height:20px !important;" type="radio" name="rbEnteringFutureTimesheets" value="enabled"  /> Enabled &nbsp; &nbsp;
                                    <input style="line-height:20px !important;height:20px !important;" type="radio" name="rbEnteringFutureTimesheets" value="disabled" checked="checked" /> Disabled &nbsp; &nbsp;
                                </span>
                            </p>

                            <p class="control-group" >
                                <label>Editing Pending Approval Timesheet</label>
                                <span class="field"  id="tipEditingPendingApproval">
                                    <input style="line-height:20px !important;height:20px !important;margin-right:5px;" type="radio" name="rbEditingPendingApproval" value="requester"  checked="checked"   /> Requester &nbsp; &nbsp;
                            	    <input style="line-height:20px !important;height:20px !important;margin-right:5px;" type="radio" name="rbEditingPendingApproval" value="manager"  /> Manager &nbsp; &nbsp; 
                                    <input style="line-height:20px !important;height:20px !important;margin-right:5px;" type="radio" name="rbEditingPendingApproval" value="administrator"    /> Administrator only
                                </span>
                            </p>

                            <p class="control-group" >
                                <label>Editing Approved Timesheet</label>
                                <span class="field"  id="tipEditingApproved">
                                    <input style="line-height:20px !important;height:20px !important;margin-right:5px;" type="radio" name="rbEditingApproved" value="requester"  checked="checked"   /> Requester &nbsp; &nbsp;
                            	    <input style="line-height:20px !important;height:20px !important;margin-right:5px;" type="radio" name="rbEditingApproved" value="manager"  /> Manager &nbsp; &nbsp; 
                                    <input style="line-height:20px !important;height:20px !important;margin-right:5px;" type="radio" name="rbEditingApproved" value="administrator"    /> Administrator only
                                </span>
                            </p>
                            <p class="control-group" >
                                <label>Daily Totals</label>
                                <span class="field"  id="tipDailyTotals">
                                   <input style="line-height:20px !important;height:20px !important;" type="radio" name="rbDailyTotals" value="enabled"  /> Enabled &nbsp; &nbsp;
                                    <input style="line-height:20px !important;height:20px !important;" type="radio" name="rbDailyTotals" value="disabled"  /> Disabled &nbsp; &nbsp;
                                </span>
                            </p>
                            
                              <p class="control-group" >
                                <label>App Logo</label>
                                <span class="field" >
                                    <input type="radio" name="rbAppLogo" value="standard"  /> Standard &nbsp; &nbsp;
                            	    <input type="radio" name="rbAppLogo" value="custom"  /> Custom &nbsp;  <a class="hyperlink" href="UploadLogo.aspx" >[Upload]</a>
                                </span>
                            </p>          
                            

                        </div>

                        <div id="aBillingSettings">

                            <p class="control-group" >
                                <label>Billable Hours</label>
                                <span class="field"  id="tipBillableHours" >
                                    <input style="line-height:20px !important;height:20px !important;" type="radio" name="rbBillableHours" value="false"  checked="checked" /> Disabled &nbsp; &nbsp;
                                    <input style="line-height:20px !important;height:20px !important;" type="radio" name="rbBillableHours" value="true"  /> Enabled &nbsp; &nbsp;
                                </span>
                            </p> 

                            <p class="control-group" >
                                <label>Billing Amount</label>
                                <span class="field"  id="tipBillingAmount">
                                    <input style="line-height:20px !important;height:20px !important;" type="radio" name="rbBillingAmount" value="false"  checked="checked" /> Disabled  &nbsp; &nbsp;
                                    <input style="line-height:20px !important;height:20px !important;" type="radio" name="rbBillingAmount" value="true"  /> Enabled &nbsp; &nbsp;
                                </span>
                            </p> 

                             
                           
                            <p class="control-group" id="pHourlyRate" style="display:none;">
                                <label>Hourly Rate</label>
                                <span class="field"  id="tipHourlyRate">
                                    <input style="line-height:20px !important;height:20px !important;" type="radio" name="rbHourlyRate" value="task"  checked="checked" /> per Task &nbsp; &nbsp;
                                    <input style="line-height:20px !important;height:20px !important;" type="radio" name="rbHourlyRate" value="user"   /> per User &nbsp; &nbsp;
                                </span>
                            </p> 

                           
                             <p class="control-group" id="pCurrencySymbol" style="display:none;">
                                <label>Currency Symbol</label>
                                <span class="field" id="tipCurrencySymbol">
                                    <input type="text" name="txtCurrencySymbol" id="txtCurrencySymbol" class="input-xlarge" />
                                </span>
                            </p> 
                            
                           
                                   

                        </div>

                        
                        <div id="aCustomFormFields">

                                <label style="width:100%;font-weight:normal;" >Start typing to <b>create new row</b>, use <b>context menu</b> (right mouse button) to <b>remove row</b>.</label> <br />

                                <div id="divCustomFormFields" style="clear:both;padding-top:15px;"></div>
                            
                                <label style="font-size:11px; font-weight:normal; border:0px; cursor:auto;" >Notice: use dot (.) as decimal separator</label>


                        </div>

                    <div id="aCustomSpreadsheetFields">

                                <label style="width:100%;font-weight:normal;" >Start typing to <b>create new row</b>, use <b>context menu</b> (right mouse button) to <b>remove row</b>.</label> <br />
                                <div id="divCustomSpreadsheetFields" style="clear:both;padding-top:15px;"></div>

                       </div>


                    </div><!--tabbedwidget-->
                    
                </form>


        
        </div>
        
    </div>
    </div>
 </div>
  

</asp:Content>
