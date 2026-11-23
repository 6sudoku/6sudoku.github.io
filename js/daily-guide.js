/* 6 Sudoku — solo navigazione illustrata della Sfida quotidiana. Nessuna modifica alla logica del gioco. */
(()=>{
 const dialog=document.getElementById('dailyConfirmDialog');
 const setup=document.getElementById('dailySetupView');
 const guide=document.getElementById('dailyGuideView');
 const open=document.getElementById('dailyGuideOpen');
 const back=document.getElementById('dailyGuideBack');
 if(!dialog||!setup||!guide||!open||!back)return;
 const viewport=dialog.querySelector('.modal-body');
 function setView(showHelp){setup.hidden=showHelp;guide.hidden=!showHelp;if(viewport)viewport.scrollTop=0;}
 open.addEventListener('click',()=>{setView(true);back.focus({preventScroll:true})});
 back.addEventListener('click',()=>{setView(false);open.focus({preventScroll:true})});
 dialog.addEventListener('close',()=>setView(false));
})();
