const { Authenticator, Authencticate } = require("../config/Authenticator");
const { VerifyToken } = require("../config/VerifyToken");


const {
  SaveEmp,
  GetEmp,
  DeleteEmp,
  GetRoles,
  SaveProj_Site,
  GetProj_site,
  DeleteProj_Site,
  UpdatePorj_site,
  GetSiteId,
  GetProjct_site,
  GetSiteID,
  UpdateProjct_site,
  GetEmpId,
  UpdateEmp,
  Login,
  GetCatagory,
  AddRole,
  UpdateRole,
  GetRoleId,
  GetRoleIdCat,
  GetTalukaList,
  GetSiteEmp,
  MarkAttendence,
  GetAttendance,
  GetRoleIdAdmin,
  PramoteUser,
  GetEmpAdmin,
  GetEmpWorkData,
  GetEmpWorkDataID,
  ResetEmpPass,
  ActivateProjSite,
  UpdateFixBillRates,
  GetFixBillRates,
  GetBillData,
  GetEmpImage,
  UpdateTempPassword,
  GetCatagoryRoleList,
  GetBillEmpCatRole,
  SaveBill,
  GetBill,
  GetBillId,
  GetCatagoryAdmin,
  GetBillSlip,
  getPfData,
  checkbillparam,
  DeleteBill,
  GetInactiveList,
  ActivateEmp,
  GetSiteEmpList,
  GetEmpAttendanceId,
  GetPaySlip,
  GetPramoteSites,
 
} = require("../models/UserModels");

exports.SaveEmp = async (req, res) => {
  let data = [];
  try {
    
    data = await SaveEmp(req.body);
    res.json({ msg: "Succesfull", data: data });
  } catch (error) {
    console.log(error);
    res.json({ msg: error, data: [] });
  }
};

exports.GetEmp = async (req, res) => {
  let data = [];
  try {
    data = await GetEmp();
    res.json({ msg: "Data Milala Ka", data: data });
  } catch (error) {
    console.log(error);
    res.json({ msg: error, data: [] });
  }
};

exports.DeleteEmp = async (req, res) => {
  let data = [];
  try {
    data = await DeleteEmp(req.body);
    res.json({ msg: "Employee udavlo ", data: data });
  } catch (error) {
    console.log(error);
    res.json({ msg: error, data: [] });
  }
};

exports.GetRole = async (req, res) => {
  let data = [];
  try {
    data = await GetRoles();
    res.json({ msg: "Ghe Role", data: data });
  } catch (error) {
    console.log(error);
    res.json({ msg: error, data: data });
  }
};

exports.SaveProj_Site = async (req, res) => {
  let data = [];
  try {
    data = await SaveProj_Site(req.body);
    res.json({ msg: "Sites save kelo be!!", data: data });
  } catch (error) {
    console.log(error);
    res.json({ msg: error, data: data });
  }
};

exports.GetProj_Site = async (req, res) => {
  let data = [];
  try {
    data = await GetProj_site();
    res.json({ msg: "Sites Dilo Bagh", data: data });
  } catch (error) {
    console.log(error);

    res.json({ msg: error, data: data });
  }
};

exports.DeleteProj_Site = async (req, res) => {
  try {
    data = await DeleteProj_Site(req.params.Id);
    res.json({ msg: "Site Khatam Tata Goodbye Gaya" });
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

exports.UpdateProj_Site = async (req, res) => {
  let data = [];
  try {
    // console.log(req);
    data = await UpdateProjct_site(req.body);
    res.json({ msg: "Site Update Kelo bagh" });
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

exports.GetSiteID = async (req, res) => {
  let data = [];
  try {
    data = await GetSiteID(req.params.Id);
    res.json({ msg: "Ghe Site Data", data: data });
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

exports.GetEmpId = async (req, res) => {
  let data = [];
  try {
    data = await GetEmpId(req.params.Id);
    res.json({ msg: "Ghe be kaamgar ", data: data });
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

exports.UpdateEmp = async (req, res) => {
  let data = [];
  try {
    data = await UpdateEmp(req.body);
    res.json({ msg: "Succesfull", data: data });
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

exports.UseAuthenticator = async (req, res) => {
//  console.log("In autho controller");
  let data=[]
  try {
    
    data=await VerifyToken(req);
    res.json({ msg: "Authenticated", data: data });
  } catch (error) {
    console.log(error);
  }
};

exports.Login = async (req, res) => {
  let data = [];
  try {
    data = await Login(req.body);
    // verifyToken();
    console.log();

    res.json({ msg: "Key Save kr be", data: data });
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

exports.GetCategroy = async (req, res) => {
  let data = [];
  try {
    data = await GetCatagory();
    res.json({ msg: "Category ghe be", data: data });
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

exports.AddEmployeeRole = async (req, res) => {
  let data = [];
  try {
    data = await AddRole(req.body);
    res.json({ msg: "roll add kelo be", data: data });
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

exports.UpdateRole = async (req, res) => {
  let data = [];
  try {
   
    data = await UpdateRole(req.body);
    res.json({ msg: "roll update kelo", data: data });
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

exports.GetRoleID = async (req, res) => {
  let data = [];
  try {
    
    data = await GetRoleId(req.params.Id);
    res.json({ msg: "ghe baba info", data: data });
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};
exports.GetRoleCat=async(req,res)=>{
  let data = [];
  try {
    
    data = await GetRoleIdCat(req.params.Id);
    res.json({ msg: "ghe baba Role", data: data });
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
}

exports.GetTalukaList=async(req,res)=>{
  let data=[];
  try{
    data=await GetTalukaList();
    res.json({msg:"taluka be!!",data:data})
    
  }catch(error)
  {
    console.log(error);
    res.json({msg:error});
  }
}

exports.GetSiteEmp=async(req,res)=>{
  let data=[];
  try{
  // console.log("coming herer",req.body);
    data=await GetSiteEmp(req.body)
    res.json({msg:"worker ale ka",data:data})

  }catch(error)
  {
    console.log(error);
    res.json({msg:error})
  }
}

exports.MarkAttendence=async(req,res)=>{
  let data=[];
  try{
   
    data=await MarkAttendence(req.body)
    res.json({msg:"Attende Marked",data:data})

  }catch(error)
  {
    console.log(error);
    res.json({msg:error})
  }
}


exports.GetAttendance=async(req,res)=>{
  let data=[];
  try{
    data=await GetAttendance(req.body);
    res.json({msg:"Attendance Lavun Ghe",data:data});

  }catch(error)
  {
    console.log(error);
    res.json({msg:error});
  }
}

exports.GetRoleIdAdmin=async(req,res)=>{

  let data=[];
  try
  {

    data=await GetRoleIdAdmin();
    res.json({msg:"Adminchi Pora",data:data});
  }catch(error)
  {
    console.log(error);
    res.json({msg:error})
  }
}

exports.PramoteUser=async(req,res)=>{
  let data=[];
  try{
    data=await PramoteUser(req.body);
    res.json({msg:"Admincha Kamgar",data:data});

  }catch(error)
  {
    console.log(error);
    res.json({msg:error});
  }
}

exports.GetEmpAdmin=async(req,res)=>{

  let data=[];
  try
  {

    data=await GetEmpAdmin();
    res.json({msg:"Adminche jigri",data:data});
  }catch(error)
  {
    console.log(error);
    res.json({msg:error})
  }
}


exports.GetEmpWorkData=async(req,res)=>{

  let data=[];
  try
  {

    data=await GetEmpWorkData();
    res.json({msg:"Adminchya Kamgaranchi Kame",data:data});
  }catch(error)
  {
    console.log(error);
    res.json({msg:error})
  }
}


exports.GetEmpWorkDataId=async(req,res)=>{

  let data=[];
  try
  {

    data=await GetEmpWorkDataID(req.params.Id);
    res.json({msg:"Admincha Kamgar ",data:data});
  }catch(error)
  {
    console.log(error);
    res.json({msg:error})
  }
}



exports.ResetEmpPass=async(req,res)=>{

  let data=[];
  try
  {

    data=await ResetEmpPass(req.params.Id);
    res.json({msg:"Password Updated",data:data});
  }catch(error)
  {
    console.log(error);
    res.json({msg:error})
  }
}

exports.ActivateProjSite=async(req,res)=>{
  let data=[];
  try
  {
    data=await ActivateProjSite(req.params.Id);
    res.json({msg:"Site abhi jinda hai",data:data});
  }catch(err)
  {
    console.log(err);
    res.json({msg:err})
  }
}

exports.UpdateFixBillRates=async(req,res)=>{

  let data=[];
  try {
   // console.log(req.body);
    data=await UpdateFixBillRates(req.body);
    res.json({msg:"Rate Updated",data:data});
  } catch (error) {
    console.log(error);
    res.json({msg:error})
  }
}

exports.GetFixBillRates=async(req,res)=>{
  let data=[];
  try {
   
    data=await GetFixBillRates();
    res.json({msg:"Rates",data:data});
  } catch (error) {
    console.log(error);
    res.json({msg:error})
  }
}

exports.GetBillData=async(req,res)=>{

  let data=[];
  try {
    data=await GetBillData();
    res.json({msg:"Bill Data",data:data});
    
  } catch (error) {
    console.log(error);
    res.json({msg:error})
  }
}

exports.getEmpImages=async(req,res)=>{
let data=[];
try {
  data=await GetEmpImage(req.params.Id)

 
  res.json({msg:"Image",data:data});
  
} catch (error) {
  console.log(error);
  res.json({msg:error})
}

}

exports.UpdateEmpPassword=async(req,res)=>{
let data=[];

try {
  data=await UpdateTempPassword(req.body)
  res.json({msg:"Temp Password Updated",data:data});

  
} catch (error) {
  console.log(error);
  res.json({msg:error})
  
}


}

exports.GetCatagoryRoleList=async(req,res)=>{
  let data=[];
  try {
    data=await GetCatagoryRoleList();
    res.json({msg:"catagoryrolelist",data:data});
    
  } catch (error) {
    console.log(error);
  res.json({msg:error})
  }
}

exports.GetBillEmpCatRole=async(req,res)=>{
let data=[];
try {
  data=await GetBillEmpCatRole(req.body);
    res.json({msg:"billempcatrole",data:data});
  
} catch (error) {
  console.log(error);
  res.json({msg:error})
}

}

exports.SaveBill=async(req,res)=>{
  let data=[];
  try {
    data=await SaveBill(req.body);
    res.json({msg:"Bill Saved",data:data});
    
  } catch (error) {
    console.log(error);
  res.json({msg:error})
  }
}

exports.GetBill=async(req,res)=>{
  let data=[];
  try {
    data=await GetBill();
    res.json({msg:"Bills",data:data});
  } catch (error) {
    console.log(error);
    res.json({msg:error})
  }
}

exports.GetBillId=async(req,res)=>{
  let data=[];
 try {
  data=await GetBillId(req.params.Id)
  res.json({msg:"BillID",data:data});
 } catch (error) {
  console.log(error);
    res.json({msg:error})
 }
}

exports.GetCategroyAdmin=async(req,res)=>{
  let data=[];
  try {
    data=await GetCatagoryAdmin()
    res.json({msg:"AdminCat",data:data});
    
  } catch (error) {
    console.log(error);
    res.json({msg:error})
  }
}

exports.GetBetSlip=async(req,res)=>{
let data=[];
try {
data=await GetBillSlip(req.params.Id)
res.json({msg:"BillSlip",data:data});
} catch (error) {
   console.log(error);
    res.json({msg:error})
}

}


exports.GetPfData=async(req,res)=>{

  let data=[];
  try {
    data=await getPfData();
    res.json({msg:"PfData",data:data});
    
  } catch (error) {
    console.log(error);
    res.json({msg:error})
  }

}

exports.CheckBillParam=async(req,res)=>{

  let data=[];
  try{
    data=await checkbillparam(req.body);
    //console.log('rresponse data', data)
    if(data)
    res.json({msg:"Billing Not Possible",data:data});
  else
  res.json({msg:"Proceed With Billing",data:data});
  }
  catch(error){

    console.log(error);
    res.json({msg:error})

  }

}


exports.DeleteBill=async(req,res)=>{

  let data=[];
  try {

    data=await DeleteBill(req.params.Id)
    res.json({msg:"Bill Deleted",data:data});
    
  } catch (error) {
    console.log(error);
    res.json({msg:error})
  }
}


exports.GetInactiveList=async(req,res)=>{

  let data=[];
  try{
    data=await GetInactiveList();
    
    res.json({msg:"Inactive List",data:data});
  }
  catch(error){

    console.log(error);
    res.json({msg:error})

  }

}


exports.ActivateEmp=async(req,res)=>{
  let data=[];
  try {
    data=ActivateEmp(req.params.Id);
    res.json({msg:"Employee Set to Active",data:data});
    
  } catch (error) {
    console.log(error);
    res.json({msg:error})
  }
}

exports.GetSiteEmpList=async(req,res)=>{
  let data=[];
  try {
    data=await GetSiteEmpList();
    res.json({msg:"Employee Count",data:data});
  } catch (error) {
    console.log(error);
    res.json({msg:error})
  }
}


exports.GetEmpAttendance=async(req,res)=>{
  let data=[];
  try {
    
    data=await GetEmpAttendanceId(req.body);
    res.json({msg:"AttendanceMonth",data:data});
  } catch (error) {
    console.log(error);
    res.json({msg:error})

  }
}

exports.GetPaySlipId=async(req,res)=>{
  let data=[];
  try {
    data=await GetPaySlip(req.params.Id);
    res.json({msg:"Payslip",data:data});
  } catch (error) {
    console.log(error);
    res.json({msg:error})
  }
}

exports.GetPramoteSites=async(req,res)=>{
let data=[];
try {
  data =await GetPramoteSites();
  res.json({msg:"pramotesitelist",data:data});
  
} catch (error) {
  console.log(error);
  res.json({msg:error})
}

}