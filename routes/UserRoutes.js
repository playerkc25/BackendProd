

const router=require("express").Router();
 
const { SaveEmp, GetEmp, DeleteEmp, SaveProj_Site, GetRole, GetProj_Site, DeleteProj_Site, UpdateProj_Site, GetSiteID, GetEmpId, UpdateEmp,  Login, GetCategroy, AddEmployeeRole, UpdateRole, GetRoleID, UseAuthenticator, GetRoleCat, GetTalukaList, GetSiteEmp, MarkAttendence, GetAttendance, GetRoleIdAdmin, PramoteUser, GetEmpAdmin, GetEmpWorkData, GetEmpWorkDataId, ResetEmpPass, ActivateProjSite, UpdateFixBillRates, GetFixBillRates, GetBillData,  getEmpImages, UpdateEmpPassword, GetCatagoryRoleList, GetBillEmpCatRole, SaveBill, GetBill, GetBillId, GetCategroyAdmin, GetBetSlip, GetPfData, CheckBillParam, DeleteBill, GetInactiveList, ActivateEmp, GetSiteEmpList, GetEmpAttendance, GetPaySlipId, GetPramoteSites } = require("../controller/UserController");



//Emp Management
router.route("/SaveEmp").post(SaveEmp);
router.route("/GetEmp").get(GetEmp);
router.route("/DeleteEmp").post(DeleteEmp);
router.route("/GetEmp/:Id").get(GetEmpId);
router.route("/UpdateEmp").put(UpdateEmp);
router.route("/GetSiteEmp").post(GetSiteEmp);
router.route("/GetEmpImage/:Id").get(getEmpImages);
router.route("/UpdateTempPassword").post(UpdateEmpPassword);
router.route("/GetBillEmpCatRole").post(GetBillEmpCatRole);
router.route("/ActivateEmp/:Id").put(ActivateEmp);
router.route("/GetAttendanceId").post(GetEmpAttendance);
//Designation or Role Management
router.route("/GetRole").get(GetRole);
router.route("/AddRole").post(AddEmployeeRole);
router.route("/GetRole/:Id").get(GetRoleID);
router.route("/GetRoleCat/:Id").get(GetRoleCat);
router.route("/UpdateRole").put(UpdateRole);
router.route("/GetCatagoryRoleList").get(GetCatagoryRoleList);

//Site Management
router.route("/SaveProj_Site").post(SaveProj_Site);
router.route("/GetProj_Site").get(GetProj_Site);
router.route("/DeleteProj_Site/:Id").delete(DeleteProj_Site);
router.route("/ActivateProj_Site/:Id").get(ActivateProjSite);
router.route("/UpdateProj_Site").put(UpdateProj_Site);
router.route("/GetProj_Site/:Id").get(GetSiteID);
router.route("/GetSiteEmpList").get(GetSiteEmpList);

//Authentication
router.route("/Authenticate").get(UseAuthenticator);

//Attendance
router.route("/Attendance").post(MarkAttendence);
router.route("/GetAttendance").post(GetAttendance);

//only Admin Routes
router.route("/GetRoleIdAdmin").get(GetRoleIdAdmin);
router.route("/PramoteUser").post(PramoteUser);
router.route("/GetEmpAdmin").get(GetEmpAdmin);
router.route("/GetEmpWorkData").get(GetEmpWorkData);
router.route("/GetEmpWorkData/:Id").get(GetEmpWorkDataId);
router.route("/ResetEmpPass/:Id").get(ResetEmpPass);
router.route("/GetCategoryAdmin").get(GetCategroyAdmin);
router.route("/GetInactiveList").get(GetInactiveList);
router.route("/GetPramoteSites").get(GetPramoteSites);

//Misc
router.route("/GetCategory").get(GetCategroy);
router.route("/GetTalukaList").get(GetTalukaList);
router.route("/GetPfData").get(GetPfData);

//GeratebIll
router.route("/UpdateFixRates").put(UpdateFixBillRates);
router.route("/GetFixRates").get(GetFixBillRates);
router.route("/GetBillData").get(GetBillData);
router.route("/SaveBill").post(SaveBill);
router.route("/GetBill").get(GetBill);
router.route("/GetBill/:Id").get(GetBillId);
router.route("/GetBillSlip/:Id").get(GetBetSlip);
router.route("/CheckBillParam").post(CheckBillParam);
router.route("/DeleteBill/:Id").delete(DeleteBill);
router.route("/GetPaySlip/:Id").get(GetPaySlipId);
module.exports=router;