#! /usr/bin/env node
const program = require('commander');
const download = require('download-git-repo');
const inquirer = require('inquirer');
const child_process = require('child_process');

program.version('1.0.0', '-v, --version');
program
    .command('create')
    .action((name) => {
	inquirer.prompt([
	    {
		type: 'input',
		name: 'projectName',
		message: '请输入项目名'
	    },
	    {
		type: 'input',
		name: 'isInstall',
		message: '是否立刻安装依赖? (请输入:yes或no)'
	    },
	]).then((answers) => {
	    let { projectName, isInstall } = answers;
	    console.log(`项目名：${projectName}`);
	    console.log(`项目初始化中...`);
	    child_process.exec(`yarn -v`,(err,out,xxx)=>{
	        if(err){
		    child_process.exec(`npm install -g yarn`,()=>{
			downLoadTemp(projectName,isInstall);
		    })
		}else{
		    downLoadTemp(projectName,isInstall);
		}
	    }).stdout.on("data",(data)=>{
		console.log(data?data:"");
	    })
	});
    });

program.parse(process.argv);


let downLoadTemp = (projectName,isInstall)=>{
    download('github.com:Essionwsk/react-web-temp#master', projectName , (err) => {
	if(err){
	    console.log("模板初始化失败");
	    return false
	}
	if(isInstall === "yes"){
	    child_process.exec(`yarn install`,{
		cwd:`./${projectName}`,
		encoding:"UTF-8",
		stdio:"pipe"
	    },(err,out,sterr)=>{

	    }).stdout.on('data', function (data) {
		console.log(data);
	    });
	}
    })
};
