const connection = require("../config/Db");

const { promisify } = require("util");

var bcryt = require("bcryptjs");
var CryptoJS = require("crypto-js");
const { parse } = require("path");
const e = require("cors");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
const promise_connection = promisify(connection.query).bind(connection);

exports.SaveEmp = async (data) => {
  let query =
    "insert into employee_data (firstName,lastName,gender,dateOfBirth,aadharNumber,fatherSpouseName,nationality,educationLevel,dateOfJoning,banktName,bankAccountNumber,ifscCode,panNumber,uan,pfNumber,esicIP,lwf,siteLocaion,categoryWork,designation,serviceBookNumber,serviceRemark,presentAddress,permanentAddress,cityName,markOfIdentification,mobileNumber,alternateMobileNumber) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  //let query="insert into employee_data(Fname)values(?)"
  //let query="insert into employee_data SET ?"
  let query2 =
    "insert into emp_profile (Emp_ID,firstName,lastName,gender,dateOfBirth,aadharNumber,fatherSpouseName,nationality,panNumber,esicIP,pfNumber,UAN) values (?,?,?,?,?,?,?,?,?,?,?,?)";
  let query3 =
    "insert into emp_official (bankName,bankAccountNumber,ifscCode,siteLocaion,categoryWork,designation,serviceBookNumber,serviceRemark) values (?,?,?,?,?,?,?,?)";
  let query1 =
    "insert into emp_data (dateOfJoning,lwf,presentAddress,permanentAddress,cityName,markOfIdentification,mobileNumber,alternateMobileNumber,educationLevel) values (?,?,?,?,?,?,?,?,?) ";
  let query4 = "insert into emp_image (ImageSave) values(?)";
  let returnale = await promise_connection(query2, [
    null,
    data.values.firstName,
    data.values.lastName,
    data.values.gender,
    data.values.dateOfBirth,
    data.values.aadharNumber,
    data.values.fatherSpouseName,
    data.values.nationality,
    data.values.panNumber,
    data.values.esicIP,
    data.values.pfNumber,
    data.values.UAN,
  ]);
  returnale =
    returnale +
    "/n" +
    (await promise_connection(query3, [
      data.values.bankName,
      data.values.bankAccountNumber,
      data.values.ifscCode,
      data.values.siteId,
      data.values.categoryId,
      data.values.roleId,
      data.values.serviceBookNumber,
      data.values.serviceRemark,
    ]));
  returnale =
    returnale +
    "/n" +
    (await promise_connection(query1, [
      data.values.dateOfJoning,
      data.values.lwf,
      data.values.presentAddress,
      data.values.permanentAddress,
      data.values.cityName,
      data.values.markOfIdentification,
      data.values.mobileNumber,
      data.values.alternateMobileNumber,
      data.values.educationLevel,
    ]));
  returnale =
    returnale + "/n" + (await promise_connection(query4, [data.values.img]));

  //  returnale=await promise_connection(query, [
  //     data.firstName,
  //     data.lastName,
  //     data.gender,
  //     data.dateOfBirth,
  //     data.aadharNumber,
  //     data.fatherSpouseName,
  //     data.nationality,
  //     data.educationLevel,
  //     data.dateOfJoning,
  //     data.banktName,
  //     data.bankAccountNumber,
  //     data.ifscCode,
  //     data.panNumber,
  //     data.uan,
  //     data.pfNumber,
  //     data.esicIP,
  //     data.lwf,
  //     data.siteLocaion,
  //     data.categoryWork,
  //     data.designation,
  //     data.serviceBookNumber,
  //     data.serviceRemark,
  //     data.presentAddress,
  //     data.permanentAddress,
  //     data.cityName,
  //     data.markOfIdentification,
  //     data.mobileNumber,
  //     data.alternateMobileNumber,
  //   ]);
  return returnale;
};

exports.DeleteEmp = async (data) => {
  let query =
    "update emp_official set doe=? , empstatus='Inactive'  where Id = ?";
  return await promise_connection(query, [data.doe, data.empId]);
};

exports.GetRoles = async () => {
  let query = "SELECT * FROM employee_role where Id>0";
  return await promise_connection(query);
};

exports.SaveProj_Site = async (data) => {
  let query =
    "insert into proj_site (siteName,siteArea,creationDate) values (?,?,?)";
  return await promise_connection(query, [
    data.siteName,
    data.siteArea,
    data.creationDate,
  ]);
};

exports.GetProj_site = async () => {
  let query = "select * from proj_site where Id>0 ";
  return await promise_connection(query);
};

exports.DeleteProj_Site = async (Id) => {
  let query = "update proj_site set Status='Inactive' where Id=?";

  return await promise_connection(query, Id);
};

exports.UpdateProjct_site = async (data) => {
  let query =
    "update proj_site set  siteName=?,siteArea=?,creationDate=? where Id=?";

  return await promise_connection(query, [
    data.siteName,
    data.siteArea,
    data.creationDate,
    data.Id,
  ]);
};

exports.GetSiteID = async (Id) => {
  let query = "select * from proj_site where Id=?";
  return await promise_connection(query, Id);
};

exports.GetEmpId = async (Id) => {
  let query =
    "select ep.Id,ep.firstName,ep.lastName,ep.gender,ep.dateOfBirth,ep.aadharNumber,ep.fatherSpouseName,ep.nationality,ep.panNumber,ep.esicIP,ep.pfNumber,ep.UAN,eo.bankName,eo.bankAccountNumber,eo.ifscCode,eo.ifscCode,ps.siteName,eo.doe,eo.empstatus as 'siteLocaion1' ,cr.CategoryWork as 'categoryWork1',er.RoleName as 'designation1',ed.cityName as TalukaName,eo.serviceBookNumber,eo.serviceRemark,ed.dateOfJoning,ed.lwf,ed.presentAddress,ed.permanentAddress,ed.cityName,eo.siteLocaion,eo.categoryWork,eo.designation,ed.markOfIdentification,ed.mobileNumber,ed.alternateMobileNumber,ed.educationLevel,sa.SupperAccess,ei.ImageSave as img from ((((((emp_profile as ep inner join emp_official as eo on ep.Id=eo.Id) inner join emp_data ed on ep.id=ed.Id and eo.Id=ed.Id)INNER join category_reg as cr on cr.Id=eo.categoryWork)INNER JOIN employee_role as er on er.Id=eo.designation)INNER JOIN proj_site as ps on ps.Id=eo.siteLocaion)INNER JOIN emp_image as ei on ei.id=ep.id)JOIN (SELECT IFNULL( (select er.RoleName from employee_role as er INNER JOIN login_data as ld on ld.roleId=er.Id where ld.empId=?) ,'not found') as 'SupperAccess') as sa where ep.Id=?";

  return await promise_connection(query, [Id,Id]);
};

exports.GetEmp = async () => {
  let query =
    "select ep.Id,ep.firstName,ep.lastName,ep.gender,ep.dateOfBirth,ep.aadharNumber,ep.fatherSpouseName,ep.nationality,ep.panNumber,ep.esicIP,ep.pfNumber,ep.UAN,eo.bankName,eo.bankAccountNumber,eo.ifscCode,eo.ifscCode,ps.siteName,cr.CategoryWork,er.RoleName,eo.serviceBookNumber,eo.serviceRemark,ed.dateOfJoning,ed.lwf,ed.presentAddress,ed.permanentAddress,ed.cityName,ed.markOfIdentification,ed.mobileNumber,ed.alternateMobileNumber,ed.educationLevel,eo.doe,eo.empstatus,null as img from ((((emp_profile as ep inner join emp_official as eo on ep.Id=eo.Id) inner join emp_data ed on ep.id=ed.Id and eo.Id=ed.Id)INNER join category_reg as cr on cr.Id=eo.categoryWork)INNER JOIN employee_role as er on er.Id=eo.designation)INNER JOIN proj_site as ps on ps.Id=eo.siteLocaion where  ep.Id>0 and eo.empstatus='Active' order by ep.Id";

  return await promise_connection(query);
};

exports.UpdateEmp = async (data) => {
  // console.log(data);
  let query =
    "update table employee_data set firstName=?,lastName=?,gender=?,dateOfBirth=?,aadharNumber=?,fatherSpouseName=?,nationality=?,educationLevel=?,dateOfJoning=?,banktName=?,bankAccountNumber,ifscCode,panNumber,uan,pfNumber,esicIP,lwf,siteLocaion,categoryWork,designation,serviceBookNumber,serviceRemark,presentAddress,permanentAddress,cityName,markOfIdentification,mobileNumber,alternateMobileNumber) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  //let query="insert into employee_data(Fname)values(?)"
  //let query="insert into employee_data SET ?"
  let query2 =
    "update emp_profile set Emp_ID=?,firstName=?,lastName=?,gender=?,dateOfBirth=?,aadharNumber=?,fatherSpouseName=?,nationality=?,panNumber=?,esicIP=?,pfNumber=?,UAN=? where Id=?";
  let query3 =
    "update  emp_official set bankName=?,bankAccountNumber=?,ifscCode=?,siteLocaion=?,categoryWork=?,designation=?,serviceBookNumber=?,serviceRemark=? where Id=?";
  let query1 =
    "update emp_data set dateOfJoning=?,lwf=?,presentAddress=?,permanentAddress=?,cityName=?,markOfIdentification=?,mobileNumber=?,alternateMobileNumber=?,educationLevel=? where Id=?";
    let query4="update emp_image set ImageSave=? where id=? "
  let returnale = await promise_connection(query2, [
    null,
    data.values.firstName,
    data.values.lastName,
    data.values.gender,
    data.values.dateOfBirth,
    data.values.aadharNumber,
    data.values.fatherSpouseName,
    data.values.nationality,
    data.values.panNumber,
    data.values.esicIP,
    data.values.pfNumber,
    data.values.UAN,
    data.values.Id,
  ]);
  returnale =
    returnale +
    "/n" +
    (await promise_connection(query3, [
      data.values.bankName,
      data.values.bankAccountNumber,
      data.values.ifscCode,
      data.values.siteId,
      data.values.categoryId,
      data.values.roleId,
      data.values.serviceBookNumber,
      data.values.serviceRemark,
      data.values.Id,
    ]));
  returnale =
    returnale +
    "/n" +
    (await promise_connection(query1, [
      data.values.dateOfJoning,
      data.values.lwf,
      data.values.presentAddress,
      data.values.permanentAddress,
      data.values.cityName,
      data.values.markOfIdentification,
      data.values.mobileNumber,
      data.values.alternateMobileNumber,
      data.values.educationLevel,
      data.values.Id,
    ]));

    returnale =
    returnale +
    "/n" +
    (await promise_connection(query4, [
    data.values.img,
      data.values.Id,
    ]));
  return returnale;
};

exports.Login = async (data) => {
  let query = "select userPassword from login_data where username=?";
  let query1 = "select username,empId,roleID from login_data where username=?";
  let returenable = [];

  var bytes = CryptoJS.AES.decrypt(data.userPassword, "nks");
  var originalText = bytes.toString(CryptoJS.enc.Utf8);

  //console.log("orignal Password is", originalText);

  returenable = await promise_connection(query, [data.userId]);
  //console.log("returnable is ", originalText);
  let t = false;
  if (returenable.length) {
    t = await bcryt.compareSync(originalText, returenable[0].userPassword);
    // const t=await bcryt.compare("1234",returenable[0].userPassword)
    //console.log("In Login sent pass",data.userPassword,"recivedpass",returenable[0].userPassword,"and resultis",t);
  }

  return t ? promise_connection(query1, [data.userId]) : [];
};

exports.AddRole = async (data) => {
  // console.log(data);
  let specialid=0;
if(data.CatagoryId==='-1')
  specialid=1;
  let query = "insert into employee_Role (RoleName,CatagoryId,Special) values (?,?,?)";
  return promise_connection(query, [data.RoleName, data.CatagoryId,specialid]);
};

exports.GetCatagory = async () => {
  let query = "select * from category_reg where Id>0";
  return promise_connection(query);  
};

exports.UpdateRole = async (data) => {
  let query = "update employee_role set RoleName=? , CatagoryId=? where Id=?";
  return promise_connection(query, [data.RoleName, data.CatagoryId, data.Id]);
};

exports.GetRoleId = async (Id) => {
  let query = "select * from employee_role where Id=?";
  return promise_connection(query, Id);
};

exports.GetRoleIdCat = async (Id) => {
  //let query = "select * from employee_role where CatagoryId=? and Id>5 ";
  let query = "select * from employee_role where CatagoryId=? and Id>0 ";
  return promise_connection(query, Id);
};

exports.GetTalukaList = async () => {
  let query = "select * from talukalist ORDER BY TalukaName ASC";
  return promise_connection(query);
};

exports.GetSiteEmp = async (data) => {
  // console.log("data is",data.siteId);
  let query =
    "select ep.Id,ed.dateOfJoning,ep.firstName,ep.fatherSpouseName,ep.lastName,0 as 'SPLallowance' from ((emp_profile as ep inner join emp_official as eo on ep.Id=eo.Id)inner join emp_data as ed on ep.ID=ed.Id and ed.Id=eo.Id) where eo.siteLocaion in(?) and ep.Id>0 and eo.empstatus='Active'";
  return promise_connection(query, [data.siteId]);
};

exports.MarkAttendence = async (data) => {
   //console.log("full sent data",data,"lenth",data.filteredData.length )
  //  console.log("",data.selectedSite.siteId )
   let query =
   "delete from attendence where  EmpId=? and SiteId=? ";
 let query2 = "insert into attendence values( ?,?,?,?,? )";
   if(data.filteredData.length>0)
    {
     
    
    Object.entries(data.filteredData).forEach(([date, value], i) => {
//       Object.entries(date).forEach(([key,data])=>{
//   console.log('key', key,'data',data);
// })
// console.log('date', date,'value ',value)
// console.log('undervalue', value.emp_id,'valuejj ',value.Date,"value lenth",value.Date.length)
promise_connection(query, [value.emp_id,data.selectedSite.siteId]);
if(value.Date.length>0)
  value.Date.map((e)=>{


  
    // promise_connection(query2, [value.emp_id,`${e.getFullYear()}-${e.getMonth() + 1}-${e.getDate()}`,data.selectedSite.siteId,
    //         "1",
    //         "0",
    //       ]);
          promise_connection(query2, [value.emp_id,dayjs(e,"MM/DD/YYYY").format("YYYY/MM/DD"),data.selectedSite.siteId,
            "1",
            "0",
          ]);
// console.log(e);
})



    })

    }
    else
    {
     console.log("delete value",data.filteredData)
    }
  // console.log("sent data",data.filteredData)

  // const t = data.filteredData?.map((data) => ({
  //   date: data.date,
  // }));
  // const d = data.filteredData?.map((data) => ({
  //   emp_ids: data.emp_ids,
  // }));
 
  // console.log("epids :", d, "modifier", d[0].emp_ids.length);

  // for (let i = 0; i < d.length; i++) {
  //   for (let j = 0; j < d[i].emp_ids.length; j++) {
  //     //console.log("data count",d[i].emp_ids[j],t[index].date,data.selectedSite.siteId,"0","0",i,j,);
  //     // console.log(
  //     //   "data count",
  //     //   `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  //     // );

  //     promise_connection(query, [
      
  //       d[i].emp_ids[j],
  //       data.selectedSite.siteId,
  //     ]);
  //     promise_connection(query2, [
  //       d[i].emp_ids[j],
  //       `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
  //       data.selectedSite.siteId,
  //       "1",
  //       "0",
  //     ]);
  //   }

  //   index++;
  //   try {
  //     date = new Date(t[index].date);
  //   } catch (err) {}
  // }

  // t.forEach(element => {
  //   console.log(  element.date);
  //   });

  return "Attendence Lavle bee!!";
};

exports.GetAttendance = async (data) => {
  const date = new Date(data.fromdate);
  const date1 = new Date(data.todate);
  // console.log(data.siteId);
  let query =
    "select GROUP_CONCAT(a.AttendanceDate SEPARATOR ', ') AS Sheet,eo.Id,eo.siteLocaion,ep.firstName,ep.fatherSpouseName,ep.lastName from ( emp_official as eo INNER JOIN emp_profile as ep on ep.id=eo.id)left JOIN attendence as a on a.EmpId=ep.Id where eo.siteLocaion=? and ep.id>0 and eo.empstatus='Active' group by ep.Id order by a.AttendanceDate DESC ";
  //"select GROUP_CONCAT(AttendanceDate SEPARATOR ', ') AS as Sheet,EmpId,SiteId  from attendence where SiteId=? and AttendanceDate between ? and ? GROUP BY EmpId order by AttendanceDate DESC";
  return promise_connection(query, [data.siteId]);
};

exports.GetRoleIdAdmin = async () => {
  let query = "select * from employee_role where Id>0 and catagoryId<0 ";
  return promise_connection(query);
};

exports.PramoteUser = async (data) => {
  console.log(data);
  const salt = await bcryt.genSalt(10);
  const hashpass = await bcryt.hash("1234", salt);
  let query1 =
    "insert into login_data (userName,userPassword,empId,roleId,lockStatus,IsActive) values (?,?,?,?,?,?) ";
  let query2 = "delete from supervisoraccess where EmpId=? ";
  let query3 = "insert into supervisoraccess values (?,?,?)";
  let returnale = "";
  returnale =
    returnale +
    promise_connection(query1, [
      data.userName,
      hashpass,
      data.empId,
      data.roleId,
      "0",
      "0",
    ]);
  returnale = returnale + promise_connection(query2, [data.empId]);
  // for(let i=0;i<data.sitelist.length;i++)
  //   {

  //   }
  
    // console.log(data.sitelist[0]);

    data.sitelist.map((siteId, index) => {
      returnale =
        returnale + promise_connection(query3, [data.empId, siteId, "1"]);
    });
  
  return returnale;
};

exports.GetEmpAdmin = async () => {
  let query =
    "select ep.Id,ep.firstName,ep.lastName,ep.gender,ep.dateOfBirth,ep.aadharNumber,ep.fatherSpouseName,ep.nationality,ep.panNumber,ep.esicIP,ep.pfNumber,ep.UAN,eo.bankName,eo.bankAccountNumber,eo.ifscCode,eo.ifscCode,ps.siteName,cr.CategoryWork,er.RoleName,eo.serviceBookNumber,eo.serviceRemark,ed.dateOfJoning,ed.lwf,ed.presentAddress,ed.permanentAddress,ed.cityName,ed.markOfIdentification,ed.mobileNumber,ed.alternateMobileNumber,ed.educationLevel from ((((emp_profile as ep inner join emp_official as eo on ep.Id=eo.Id) inner join emp_data ed on ep.id=ed.Id and eo.Id=ed.Id)INNER join category_reg as cr on cr.Id=eo.categoryWork)INNER JOIN employee_role as er on er.Id=eo.designation)INNER JOIN proj_site as ps on ps.Id=eo.siteLocaion where ep.Id NOT in (select EmpId from login_data) and eo.empstatus='Active'";

  return await promise_connection(query);
};

exports.GetEmpAdmin = async () => {
  let query =
    "select ep.Id,ep.firstName,ep.lastName,ep.gender,ep.dateOfBirth,ep.aadharNumber,ep.fatherSpouseName,ep.nationality,ep.panNumber,ep.esicIP,ep.pfNumber,ep.UAN,eo.bankName,eo.bankAccountNumber,eo.ifscCode,eo.ifscCode,ps.siteName,cr.CategoryWork,er.RoleName,eo.serviceBookNumber,eo.serviceRemark,ed.dateOfJoning,ed.lwf,ed.presentAddress,ed.permanentAddress,ed.cityName,ed.markOfIdentification,ed.mobileNumber,ed.alternateMobileNumber,ed.educationLevel from ((((emp_profile as ep inner join emp_official as eo on ep.Id=eo.Id) inner join emp_data ed on ep.id=ed.Id and eo.Id=ed.Id)INNER join category_reg as cr on cr.Id=eo.categoryWork)INNER JOIN employee_role as er on er.Id=eo.designation)INNER JOIN proj_site as ps on ps.Id=eo.siteLocaion where ep.Id NOT in (select EmpId from login_data) and eo.empstatus='Active'";

  return await promise_connection(query);
};

exports.GetEmpWorkData = async () => {
  let query =
    "SELECT ld.userName,ld.empid,ep.firstName,ep.fatherSpouseName,ep.lastName,ep.gender,er.RoleName,GROUP_CONCAT(ps.siteName SEPARATOR ',') AS SiteId FROM (((login_data as ld inner join emp_profile as ep on ep.Id=ld.empId)inner JOIN employee_role as er on er.Id=ld.roleId)INNER join supervisoraccess as sa on sa.EmpId=ld.empId)INNER join proj_site as ps on ps.Id=sa.siteId group BY ld.empId";

  return await promise_connection(query);
};

exports.GetEmpWorkDataID = async (ID) => {
  let query =
    "SELECT ld.userName,ld.empid,ep.firstName,ep.fatherSpouseName,ep.lastName,ep.gender,er.RoleName,GROUP_CONCAT(ps.siteName SEPARATOR ',') AS SiteId FROM (((login_data as ld inner join emp_profile as ep on ep.Id=ld.empId)inner JOIN employee_role as er on er.Id=ld.roleId)INNER join supervisoraccess as sa on sa.EmpId=ld.empId)INNER join proj_site as ps on ps.Id=sa.siteId where ld.empid=? group BY ld.empId ";

  return await promise_connection(query, [ID]);
};

exports.ResetEmpPass = async (ID) => {
  let query = "update login_data set userPassword='1234' where empId=? ";

  return await promise_connection(query, [ID]);
};

exports.ActivateProjSite = async (ID) => {
  let query = "update proj_site set Status='Active' where Id=?";

  return await promise_connection(query, [ID]);
};

exports.UpdateFixBillRates = async (data) => {
  // console.log(data);
  let query =
    "update billratefixed set DArate=?,HRARate=?,PFRate=?,ESICRate=?,incomeTax=?,High_Skilled=?,Semi_Skilled=?,Skilled=?,UnSkilled=? where Id=1";
  return await promise_connection(query, [
    data.DArate,
    data.HRARate,
    data.PFRate,
    data.ESICRate,
    data.incomeTax,
    data.High_Skilled,
    data.Semi_Skilled,
    data.Skilled,
    data.UnSkilled,
  ]);
};

exports.GetFixBillRates = async () => {
  let query = "select * from billratefixed";
  return await promise_connection(query);
};

exports.GetBillData = async () => {
  let query = "select * from billdata";
  return await promise_connection(query);
};

exports.GetEmpImage = async (ID) => {
  //console.log("in model",ID);
  let query = "select * from emp_image where Id=?";
  return await promise_connection(query, [ID]);
};

exports.UpdateTempPassword = async (data) => {
  //console.log("sent obj", data);
  var bytes = CryptoJS.AES.decrypt(data.userId, "nks");
  var originalText = bytes.toString(CryptoJS.enc.Utf8);

  var bytes = CryptoJS.AES.decrypt(data.userPassword, "nks");
  var originalPass = bytes.toString(CryptoJS.enc.Utf8);

  const salt = await bcryt.genSalt(10);
  const hashpass = await bcryt.hash(originalPass, salt);

  //  console.log("passwrord to update",data.userPassword,"sent userid ",data.userid,"decrypt id is",originalText)
  let query = "update login_data set userPassword=? where  empId=?";
  return await promise_connection(query, [hashpass, originalText]);
};

exports.SaveMonthlyRates = async (data) => {
  let query =
    "insert into monthlyrates(catagoryid,roleId,otherAllowance) values (?,?,?)";

  return await promise_connection(query, [
    data.catagoryid,
    data.roleId,
    data.otherAllowance,
  ]);
};

exports.GetCatagoryRoleList = async () => {
  let query =
    "SELECT cr.Id as CatId,er.Id as id,cr.CategoryWork,er.RoleName FROM category_reg as cr inner join employee_role as er on cr.Id=er.CatagoryId where er.Id>2 ORDER BY `cr`.`CategoryWork` ASC";
  return await promise_connection(query);
};
// [
//   data.SiteId,
//   `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
//   `${date1.getFullYear()}-${date1.getMonth() + 1}-${date1.getDate()}`,
// ]

// data.sitepageIdsobj.siteId,
// data.sitepageIdsobj.categoryId,
// data.sitepageIdsobj.roleId,
exports.GetBillEmpCatRole = async (data) => {
  //console.log("data is",data);
  let query =
    "SELECT t2.CatId,t2.Id,t2.CategoryWork,t2.RoleName,  CASE WHEN t2.CategoryWork = 'High Skilled' THEN t1.High_Skilled WHEN t2.CategoryWork = 'Semi Skilled' THEN t1.Semi_Skilled WHEN t2.CategoryWork = 'Skilled' THEN t1.Skilled        WHEN t2.CategoryWork = 'UnSkilled' THEN t1.UnSkilled  END AS Basic FROM (SELECT cr.Id as CatId,er.Id as id,cr.CategoryWork,er.RoleName FROM (category_reg as cr inner join employee_role as er on cr.Id=er.CatagoryId) where er.Id>2  and er.Id in(SELECT eo.designation FROM emp_official as eo where eo.Id in (?) and eo.empstatus='Active' ) ORDER BY `cr`.`CategoryWork` ASC) t2 JOIN  billratefixed t1 ON t1.Id = 1";
  return await promise_connection(query, [data]);
};

exports.SaveBill = async (data) => {
  let returenable = null;
  let query = "select max(BillId) as maxbillid from billdata";
  //const billid=JSON.stringify( await promise_connection(query));
  let billid = await promise_connection(query);
  //console.log('first', data)
  billid = billid[0].maxbillid;
  if (billid === null) billid = 1;
  else billid = 1 + billid;

  let query1 = "insert into billdata values (?,?,?,?)";
  let query2 = "insert into billrate values(?,?,?,?,?,?)";
  let query3 = "insert into billsites values (?,?)";
  let query4="insert into billemp values(?,?,?)"
  dayjs.extend(customParseFormat);
  const billStartDate = dayjs(data.billStartDate, "YYYY/MM/DD").format(
    "YYYY/MM/DD"
  );
  const billEndDate = dayjs(data.billEndDate, "YYYY/MM/DD").format(
    "YYYY/MM/DD"
  );
  returenable = await promise_connection(query1, [
    billid,
    billStartDate,
    billEndDate,
    data.selectedEmployee.length,
  ]);
  data.siteId.map(async (value) => {
    returenable =
      returenable + (await promise_connection(query3, [billid, value]));
  //  console.log('siteidare', value);
  });
  var result = Object.keys(data.rateGridState).map((key) => [
    key,
    data.rateGridState[key],
  ]);

  result.map(async (value) => {
    returenable =
      returenable +
      (await promise_connection(query2, [
        billid,
        value[1].CatId,
        value[1].id,
        value[1]?.Basic,
        value[1]?.otherAllowance,
        0,
      ]));
    // console.log('siteidare', value[1].CatId,value[1].id,value[1]?.basicAllowance,value[1]?.otherAllowance,0);
    // console.log('first', value[1].id)
  });
  var datagridobj = Object.keys(data.dataGridState).map((key) => [
    key,
    data.dataGridState[key],
  ]);
  datagridobj.map(async(value)=>{
   // console.log('fulldata', value[1])
   
returenable=returenable+(await promise_connection(query4,[billid,value[1].id,value[1]?.SPLallowance]))
    //console.log('datagridstateid', value[1].id,value[1]?.SPLallowance)
  })
  return returenable;
  //console.log('sentdate', returenable);
};

exports.GetBill = async () => {
  // let query="select bd.billid,bd.fromdate,bd.todate,bd.totalemp,count(bs.siteId) as 'Total Sites' from billdata as bd INNER join billsites as bs on bs.BillId=bd.BillId GROUP BY bd.BillId";
  let query =
    "select bd.billid,bd.fromdate,bd.todate,bd.totalemp,GROUP_CONCAT(pj.siteName SEPARATOR ',') as 'Total Sites' from ((billdata as bd INNER join billsites as bs on bs.BillId=bd.BillId)INNER JOIN proj_site as pj on pj.Id=bs.siteId) GROUP BY bd.BillId";
  return promise_connection(query);
};

exports.GetBillId = async (Id) => {
  // let query="select bd.billid,bd.fromdate,bd.todate,bd.totalemp,count(bs.siteId) as 'Total Sites' from billdata as bd INNER join billsites as bs on bs.BillId=bd.BillId GROUP BY bd.BillId";
  let query =
    "select bd.BillId,be.EmpId,ep.firstName,ep.lastName,a.AttendanceDate as noOfDayswork,0 as overtimeHrs,br.basic as basicWage,be.SPLallowance as specialBasic,(a.AttendanceDate*br.basic) as totalWage,(a.AttendanceDate*(br.basic+(ROUND(((br.basic* brf.HRARate)/100),0))+(br.otherallowance))) as grandTotal ,ROUND(((br.basic* brf.DArate)/100),2) as wageDA,0  as paymentovertime,ROUND(((br.basic* brf.HRARate)/100),0) as HRA,br.otherallowance as otherSpecialAllows,(br.basic+(ROUND(((br.basic* brf.HRARate)/100),0))+(br.otherallowance)) as wageRate,0  deductSociety,brf.incomeTax as deductPT,0  deductInsurance,0  deductOthers,0  deductRecoveries,0  TransactionId,0  dateOfPayment,'remark ok' as remarkOfPayment,ROUND(((br.basic* brf.PFRate)/100),0) as deductPf,ROUND((( ((br.basic+((br.basic* brf.HRARate)/100))+(br.otherallowance))* brf.ESICRate)/100)) as deductESIC,ROUND(((((br.basic* brf.PFRate)/100))+((( ((br.basic+((br.basic* brf.HRARate)/100))+(br.otherallowance))* brf.ESICRate)/100))+(brf.incomeTax))) as totalDeduction from (((((billdata as bd INNER JOIN billemp as be on bd.BillId=be.BillId)INNER join emp_profile as ep on ep.Id=be.EmpId)left JOIN (SELECT EmpId,COUNT(*) as AttendanceDate FROM `attendence` GROUP BY EmpId) as a on a.EmpId=ep.Id)INNER JOIN emp_official as eo on eo.Id=be.EmpId )INNER JOIN billrate as br on br.BillId=bd.BillId and eo.categoryWork=br.rollId and eo.designation=br.categoryId)JOIN billratefixed as brf where bd.BillId=? GROUP by ep.Id";
  return promise_connection(query, [Id]);
};

exports.GetCatagoryAdmin=async()=>{
  let query="select * from category_reg"
  return promise_connection(query);
}

exports.GetBillSlip=async(Id)=>{
  let query="select ROW_NUMBER() over (PARTITION by '1') AS serialNo, bd.BillId,be.EmpId as 'registerNo',ep.pfNumber as pfAccountNo,ep.Id,CONCAT(ep.firstName,' ',ep.lastName) as name,ep.fatherSpouseName as fatherName,ep.gender,er.RoleName,a.AttendanceDate as daysWorked,0 as pl,0 as holidays,br.basic as rateofwage,(br.basic+ROUND(((br.basic* brf.HRARate)/100),0))+(br.otherallowance) as basicWages,ROUND(((br.basic* brf.HRARate)/100),0) as hra,0 as otHoursWorked,ROUND(((br.basic* brf.HRARate)/100),0) as hraFix,ROUND(a.AttendanceDate *(br.basic)) as totalWages,ROUND(((br.basic* brf.PFRate)/100),0) as pf,brf.incomeTax as pt,ROUND((( ((br.basic+((br.basic* brf.HRARate)/100))+(br.otherallowance))* brf.ESICRate)/100)) as esic,0 as otwages,ed.lwf,0 as coupon,0 as adv,ROUND(((((br.basic* brf.PFRate)/100))+((( ((br.basic+((br.basic* brf.HRARate)/100))+(br.otherallowance))* brf.ESICRate)/100))+(brf.incomeTax))) as totalDeduction,ROUND((a.AttendanceDate*(br.basic+(br.basic*brf.HRARate/100)+(br.otherallowance)))-((((((br.basic* brf.PFRate)/100))+ROUND ((( ((br.basic+((br.basic* brf.HRARate)/100))+(br.otherallowance))* brf.ESICRate)/100))+(brf.incomeTax))))) as netAmount,DATE_FORMAT(bd.fromdate, '%b/%Y') as 'startDate',DATE_FORMAT(bd.todate, '%b/%Y') as 'endDate'  FROM ((((((((billdata as bd INNER join billemp as be on be.BillId=bd.BillId)INNER join emp_profile as ep on ep.Id=be.EmpId)INNER join emp_data as ed on ed.Id=be.EmpId)INNER join emp_official as eo on eo.Id=be.EmpId)INNER join employee_role as er on er.catagoryid=eo.categoryWork and er.Id=eo.designation)LEFT join (SELECT EmpId,COUNT(*) as AttendanceDate FROM `attendence` GROUP BY EmpId) as a on a.EmpId=be.EmpId)INNER JOIN billrate as br on br.BillId=bd.BillId)JOIN billratefixed as brf) WHERE bd.BillId=? GROUP by ep.Id";
  return promise_connection(query,[Id]);
}

exports.getPfData=async()=>{
  let query="select ";
  return promise_connection(query);
}





exports.checkbillparam=async(data)=>{
 // console.log('data', data)

let returenable=null;
  let query="SELECT  bd.BillId,bd.fromdate,bd.todate,bd.totalemp,bs.siteId,dayofyear(bd.fromdate),dayofyear(?),year(fromdate),year(?) FROM `billdata` as bd INNER JOIN billsites as bs on bs.BillId=bd.BillId where ((dayofyear(?)BETWEEN dayofyear(bd.fromdate) and dayofyear(bd.todate)) or (dayofyear(?)BETWEEN dayofyear(bd.fromdate) and dayofyear(bd.todate))) and year(fromdate)=year(?) and bs.siteId in(?) GROUP by bd.BillId";
  const billStartDate = dayjs(data.billStartDate,"DD/MM/YYYY").format("YYYY/MM/DD");
  const billEndDate = dayjs(data.billEndDate,"DD/MM/YYYY").format("YYYY/MM/DD");
  returenable=await promise_connection(query, [billStartDate,billEndDate,billStartDate,billEndDate,billStartDate,data.siteId])
 // console.log('returnvalue', returenable.length)
  
return returenable.length;

}



exports.DeleteBill=async(Id)=>{

  let query="delete from billdata where BillId=?";
  return promise_connection(query,[Id]);

}

exports.GetInactiveList=async()=>{

  let query="select ep.Id,ep.firstName,ep.lastName,ep.gender,ep.dateOfBirth,ep.aadharNumber,ep.fatherSpouseName,ep.nationality,ep.panNumber,ep.esicIP,ep.pfNumber,ep.UAN,eo.bankName,eo.bankAccountNumber,eo.ifscCode,eo.ifscCode,ps.siteName,cr.CategoryWork,er.RoleName,eo.serviceBookNumber,eo.serviceRemark,ed.dateOfJoning,ed.lwf,ed.presentAddress,ed.permanentAddress,ed.cityName,ed.markOfIdentification,ed.mobileNumber,ed.alternateMobileNumber,ed.educationLevel,eo.doe,eo.empstatus,null as img from ((((emp_profile as ep inner join emp_official as eo on ep.Id=eo.Id) inner join emp_data ed on ep.id=ed.Id and eo.Id=ed.Id)INNER join category_reg as cr on cr.Id=eo.categoryWork)INNER JOIN employee_role as er on er.Id=eo.designation)INNER JOIN proj_site as ps on ps.Id=eo.siteLocaion where  ep.Id>0 and eo.empstatus='Inactive' order by ep.Id";
  return promise_connection(query);

}

exports.ActivateEmp=async(Id)=>{

  let query="update emp_official set empstatus='Active' where Id=?";
  return promise_connection(query,[Id]);

}



exports.GetSiteEmpList=async()=>{

  let query="select ps.Id,ps.siteName,ps.siteArea,COUNT( eo.id) as EmployeeCount from proj_site as ps INNER join emp_official as eo on eo.siteLocaion=ps.Id where eo.empstatus='Active' and ps.Id>0 GROUP BY siteName";
  return promise_connection(query);
}

exports.GetEmpAttendanceId=async(data)=>{

  let query="SELECT  EmpId, DATE_FORMAT(AttendanceDate, '%b') AS month, COUNT(*) AS AttendanceCount FROM  attendence WHERE  EmpId = ? and year(AttendanceDate)=? GROUP BY EmpId, month ORDER BY STR_TO_DATE(CONCAT('01-', month, '-?' ), '%d-%b-%Y')";
  //console.log('first', data.year)
  return promise_connection(query,[data.Id,data.year]);

}

exports.GetPaySlip=async(Id)=>
  {
    let query="select ROW_NUMBER() over (PARTITION by '1') AS serialNo, bd.BillId,be.EmpId as 'registerNo',ep.pfNumber as pfAccountNo,ep.Id,CONCAT(ep.firstName,' ',ep.lastName) as name,ep.fatherSpouseName as fatherName,ep.gender,er.RoleName,a.AttendanceDate as daysWorked,0 as pl,0 as holidays,br.basic as rateofwage,(br.basic+ROUND(((br.basic* brf.HRARate)/100),0))+(br.otherallowance) as basicWages,ROUND(((br.basic* brf.HRARate)/100),0) as hra,0 as otHoursWorked,ROUND(((br.basic* brf.HRARate)/100),0) as hraFix,ROUND(a.AttendanceDate *(br.basic)) as totalWages,ROUND(((br.basic* brf.PFRate)/100),0) as pf,brf.incomeTax as pt,ROUND((( ((br.basic+((br.basic* brf.HRARate)/100))+(br.otherallowance))* brf.ESICRate)/100)) as esic,0 as otwages,ed.lwf,0 as coupon,0 as adv,ROUND(((((br.basic* brf.PFRate)/100))+((( ((br.basic+((br.basic* brf.HRARate)/100))+(br.otherallowance))* brf.ESICRate)/100))+(brf.incomeTax))) as totalDeduction,ROUND((a.AttendanceDate*(br.basic+(br.basic*brf.HRARate/100)+(br.otherallowance)))-((((((br.basic* brf.PFRate)/100))+ROUND ((( ((br.basic+((br.basic* brf.HRARate)/100))+(br.otherallowance))* brf.ESICRate)/100))+(brf.incomeTax))))) as netAmount,DATE_FORMAT(bd.fromdate, '%b/%Y') as 'startDate',DATE_FORMAT(bd.todate, '%b/%Y') as 'endDate'  FROM ((((((((billdata as bd INNER join billemp as be on be.BillId=bd.BillId)INNER join emp_profile as ep on ep.Id=be.EmpId)INNER join emp_data as ed on ed.Id=be.EmpId)INNER join emp_official as eo on eo.Id=be.EmpId)INNER join employee_role as er on er.catagoryid=eo.categoryWork and er.Id=eo.designation)LEFT join (SELECT EmpId,COUNT(*) as AttendanceDate FROM `attendence` GROUP BY EmpId) as a on a.EmpId=be.EmpId)INNER JOIN billrate as br on br.BillId=bd.BillId)JOIN billratefixed as brf) WHERE ep.Id=? GROUP by ep.Id;";
    return promise_connection(query,[Id]);
  }

  exports.GetPramoteSites=async()=>{

    let query="";
    return promise_connection(query);
  }