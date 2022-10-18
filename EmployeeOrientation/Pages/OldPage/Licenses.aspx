<%@ Page language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
    
    
   <!-- <SharePoint:ScriptLink name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />-->
    <
    <meta name="WebPartPageExpansion" content="full" />

    <link rel="stylesheet" href="../Content/bundle_without_tables.css" type="text/css" />
    

    <script src="../Scripts/jquery-1.10.2.js"></script>
    <script src="../Scripts/jquery-ui-1.9.2.min.js"></script>
    <script src="../Scripts/jtable/jquery.jtable.min.js"></script>

    <script type="text/javascript" src="../Scripts/bootstrap.min.js"></script>
    <script type="text/javascript" src="../Scripts/bootstrap-timepicker.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.validate.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.tagsinput.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.autogrow-textarea.js"></script>
    <script type="text/javascript" src="../Scripts/chosen.jquery.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.cookie.js"></script>
    <script type="text/javascript" src="../Scripts/modernizr.min.js"></script>
    <script type="text/javascript" src="../Scripts/moment.min.js"></script>
    <script type="text/javascript" src="../Scripts/notify.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.loadTemplate-1.4.4.min.js"></script>
    <script type="text/javascript" src="../Scripts/sha3.js"></script>
    

    <!--Custom script-->
    <script type="text/javascript" src="../Scripts/jquery.validationEngine.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.validationEngine-en.js"></script>
    <link rel="stylesheet" href="../Content/validationEngine-jquery.css" type="text/css" />
    

    <script type="text/javascript" src="../Scripts/Custom/Common.js"></script>   
    <script type="text/javascript" src="../Scripts/Custom/Licenses.js"></script>

    <link rel="stylesheet" href="../Content/styles.css" type="text/css" />
</asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
   <!-- <WebPartPages:WebPartZone runat="server" FrameType="TitleBarOnly" ID="full" Title="loc:full" />-->
   
    <div class="containerWrapper" >      
              
    <!--Menu-->
    <div id="containerLeft" class="containerLeft"  style="float:left;width:200px;margin-top:10px; "> 
         <a href="Default.aspx"> <div id="logoleft" class="mainLogo" style="background-image: url(../Images/logo.png) !important;"> </div>  </a>
    
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
            <h1>License </h1>
        </div>

        <div id="mainContainer" style="clear:both;">

             <form id="licenseForm" class="stdform stdform2" method="post" style="display:none;">

                   <div style="margin: 10px;font-size:14px;">

                       <span> Click <a href="#" target="_blank" >here</a> to buy a site license in our Store. </span> <br /><br />

                        <span><b>Enter your Activation Key:</b></span> <br />

                        <p class="control-group" style="border:0px;">
                                <input type="text" name="txtActivationKey" id="txtActivationKey" class="input-xlarge" placeholder="XXXX-XXXX-XXXX-XXXX-XXXX"  style="width:200px;"  /> 
                         </p>
                         
                        <div style="width:100%;height:20px;margin-top:10px;">
                        <button id="btnSubmit" type="submit" class="btn btn-primary">Activate</button>
                        </div>
                    </div>

               </form>


            <div id="validForm" style="display:none;">

                <label style="color:green;font-size:14px;" id="lblMessage"></label> 
                <br />
                <label style="font-weight:bold;font-size:14px;" >Activation Key:</label> <label  style="font-size:14px;" id="lblActivationKey"></label>

            </div>

        </div>

    </div>

   </div>
</asp:Content>
