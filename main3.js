let fs=require("fs");
let cheerio=require("cheerio");
let request=require("request");
let path=require("path");
let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595";
request(url,cb);
function cb(error,response,html){
    if(error){
        console.log("error");
    }else if(response.statusCode==404){
   console.log("page not found");
    }else{
        dataextracter(html);
    }
}
function dataextracter(html){
    let searchtool=cheerio.load(html);
    let elemarray=searchtool("a[data-hover='View All Results']");
    let link=searchtool(elemarray).attr("href");
    // console.log(link);
    let newlink=`https://www.espncricinfo.com${link}`;
    request(newlink,newcb);
}
function newcb(error,response,html){
if(error){
console.log("error");
}else if(response.statusCode==404){
console.log("page is not found");
}else{
    dataextracter1(html);
}
}
function dataextracter1(html){
    let searchTool1=cheerio.load(html);
    let elemrearray1=searchTool1("a[data-hover='Scorecard']");
    for(let i=0;i<elemrearray1.length;i++){
        let link1=searchTool1(elemrearray1[i]).attr("href");
       let new_link=`https://www.espncricinfo.com${link1}`;
       request(new_link,cb1);
    }
}
function cb1(error,response,html){
    if(error){
        console.log("error");
    }else if(response.statusCode==404){
        console.log("page not found");
    }else{
        dataextracter2(html);
    }
}
function dataextracter2(html){
    let searchTool3=cheerio.load(html);
    let elemrearray3=searchTool3(".Collapsible");
    for(let i=0;i<elemrearray3.length;i++){
        // fs.writeFileSync(`innings${i+1}.html`,searchTool3(elemrearray3[i]).html());
        let teamname=searchTool3(elemrearray3[i]).find("h5");
        team=teamname.text();
        // console.log(team);
        team=team.split("INNINGS")[0];
        team=team.trim();
        console.log(team);
        console.log("````````````````````````````````")
        let elemrearray4=searchTool3(elemrearray3[i]).find(".table.batsman tbody tr");
        for(let i=0;i<elemrearray4.length;i++){

         let playerdata=searchTool3(elemrearray4[i]).find("td");
         if(playerdata.length==8){
        //   for(let i=0;i<playerdata.length;i++){
              let name=searchTool3(playerdata[0]).text();
              console.log(name);
          }
        //  }

        }
    }
}
