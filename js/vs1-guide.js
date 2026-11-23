/* 6 Sudoku — sola navigazione grafica per la guida Sfida 1 VS 1. */
(()=>{
 const dialog=document.getElementById('vs1SetupDialog');
 const setup=document.getElementById('vs1SetupView');
 const guide=document.getElementById('vs1GuideView');
 const open=document.getElementById('vs1GuideOpen');
 const back=document.getElementById('vs1GuideBack');
 if(!dialog||!setup||!guide||!open||!back)return;
 const viewport=dialog.querySelector('.modal-body');
 function showGuide(){setup.hidden=true;guide.hidden=false;if(viewport)viewport.scrollTop=0;back.focus({preventScroll:true});}
 function showSetup(){guide.hidden=true;setup.hidden=false;if(viewport)viewport.scrollTop=0;open.focus({preventScroll:true});}
 open.addEventListener('click',showGuide);
 back.addEventListener('click',showSetup);
 dialog.addEventListener('close',()=>{guide.hidden=true;setup.hidden=false;});
})();
