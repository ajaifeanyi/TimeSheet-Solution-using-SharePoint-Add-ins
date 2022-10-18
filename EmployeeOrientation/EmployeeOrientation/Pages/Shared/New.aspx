<%@ Page language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
     <link rel="stylesheet" href="../../Content/bundle.css" type="text/css" />

    <link rel="stylesheet" href="../../Content/styles.css" type="text/css" />

    <script type="text/javascript" src="../../Scripts/jquery-1.9.1.js"></script>
      <script type="text/javascript" src="../../Scripts/jquery.jtable.min.js"></script>
    <script type="text/javascript" src="../../Scripts/jquery.loadTemplate-1.4.4.min.js"></script>
    <script type="text/javascript" src="../../Scripts/jquery-ui-1.9.2.min.js"></script>
    <script type="text/javascript" src="../../Scripts/bootstrap.min.js"></script>
    
    <script type="text/javascript" src="../../Scripts/jquery.cookie.js"></script>
    <script type="text/javascript" src="../../Scripts/modernizr.min.js"></script>
    <script type="text/javascript" src="../../Scripts/moment.min.js"></script>
    <script type="text/javascript" src="../../Scripts/numeral.js"></script>
    <script type="text/javascript" src="../../Scripts/bootstrap-contextmenu.js"></script>


     <!--Custom script-->
   
    <script type="text/javascript" src="../../Scripts/Custom/AppInit.js"></script>
    <script type="text/javascript" src="../../Scripts/Custom/LicenseInit.js"></script>
    <script type="text/javascript" src="../../Scripts/Custom/Default.js"></script>

      <style type="text/css" media="screen">
          .scrollable-menu {
            height: auto;
            max-height: 300px;
            overflow-x: hidden;
        }
    </style>
</asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
    <WebPartPages:WebPartZone runat="server" FrameType="TitleBarOnly" ID="full" Title="loc:full" />
 

    <!--Header-->
    <div class="divHeader" >
        <div class="divPreviousSite"><img src="../Images/leftarrow.png" /> <a id="previousSiteUrl" href="#" class="previousSiteUrl" >Back to the previous site</a>  </div>
        <div class="divUserInfo"> <span class="spanUserInfo" id="userWelcomeMsg" >  </span></div>
    </div>
    <div class="divHeader divHeaderGray" > <span class="spanLicenseInfo" id="spanLicenseInfo" ></span>  </div>
              
    <div class="containerWrapper" >

     <!--Menu-->
    <div id="containerLeft" class="containerLeft"  style="float:left;width:200px;margin-top:10px; "> 
         <a href="Default.aspx"><div id="logoleft" class="mainLogo" style="background-image: url(logo.png) !important;"> </div></a>

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
            <a href="#" id="menuExpandButton" class="menuExpandButton" data-name="hide" ><img src="../../Images/menu-icon.png"></a>
            <h1>Timesheet Plus</h1>
        </div>

        <div id="mainContainer" style="clear: both;">

            <div id="getStarted" style="margin-top: 20px;">
                <h2>Get started with Timesheet Plus</h2>

                <div class="tilesContainer">
                    <div class="tileMedium tileCreate" id="divTileCreate">
                        <div class="tileText">Create new </div>
                    </div>
                    <div class="tileMedium tileCreate" id="divTileCreateOnBehalf" style="display:none;">
                        <div class="tileText">Create new on behalf of other</div>
                    </div>
                    <div  class="tileMedium tileEdit" id="divEdit" >
                        <div class="tileText" >Edit current</div>
                    </div>

                    <div onclick="window.location.href='ToApproveByMe.aspx'" class="tileMedium tileApprove" style="display:none;">
                        <div class="tileText">Approve</div>
                    </div>
                    
                    <div onclick="window.location.href='UserGuide.aspx'" class="tileMedium tileLearn">
                        <div class="tileText">Learn more</div>
                    </div>
                </div>

            </div>


            <div style="width: 795px; margin-top: 25px">
                <div class="jtableContainer" id="TimeSheets"></div>
            </div>

        </div>

    </div>

  </div>

 <div id="context-menu">
	    <ul class="dropdown-menu scrollable-menu" role="menu" id="ulContextMenu">
	    </ul>
</div>

<div id="context-menu-on-behalf">
	    <ul class="dropdown-menu scrollable-menu" role="menu" id="ulContextMenuOnBehalf">
	    </ul>
</div>


</asp:Content>
