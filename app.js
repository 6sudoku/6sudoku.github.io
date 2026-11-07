/* 6 Sudoku 0.11 — interfaccia touch e sfide senza server. */
(() => {
'use strict';
const $=q=>document.querySelector(q), $$=q=>Array.from(document.querySelectorAll(q));
const T={
 it:{kicker:'IL TUO PICCOLO GRANDE GIOCO',ready:'Sei pronto?',intro:'Sei numeri, infinite piccole sfide. Un momento tutto per te.',difficulty:'SCEGLI LA DIFFICOLTÀ',beginner:'Principiante',beginnerDesc:'Per iniziare con calma',intermediate:'Intermedio',intermediateDesc:'Un po’ più di ragionamento',advanced:'Avanzato',advancedDesc:'Mettiti alla prova',play:'Inizia una partita',daily:'Sfida quotidiana',stats:'Le mie statistiche',shareApp:"Condividi l'app",received:'Hai ricevuto una sfida!',installTitle:'Installa 6 Sudoku',install:'Installa',installWin:'⬇ Installa l’app',localInstall:'Per installarla, apri la versione pubblicata su GitHub Pages (HTTPS). Qui stai provando i file locali.',installed:'App installata!',standaloneHint:'Puoi aprirla direttamente dalla schermata Home.',home:'Home',instructions:'Ogni riga, colonna e rettangolo contiene i numeri da 1 a 6.',erase:'Cancella',hint:'Suggerimento',share:'Condividi',statsKicker:'IL TUO PERCORSO',statsDesc:'Un passo alla volta, una griglia alla volta.',wins:'Schemi completati',today:'Completati oggi',best:'Miglior tempo',finished:'SFIDA COMPLETATA',congrats:'Complimenti!',winSubtitle:'Hai completato il tuo 6 Sudoku.',challengeFriend:'🏁 Sfida un amico',newGame:'Nuova partita',whatsapp:'Invia su WhatsApp',installHelp:'Installa 6 Sudoku',understood:'Ho capito',shareTitle:'Condividi la sfida',shareDesc:'Scegli come inviare il link.',shareMenu:'Condividi con...',copy:'Copia il link',close:'Chiudi',footer:'UN PICCOLO GRANDE GIOCO DI LOGICA',challengeTarget:'Tempo da battere',dailyTitle:'Sfida quotidiana',wrong:'Questo numero non è corretto. Riprova!',selected:'Seleziona prima una casella vuota.',fixed:'Questa casella non si può modificare.',hintFeedback:'Un piccolo aiuto! +30 secondi al punteggio.',hintPenalty:'Penalità suggerimenti',beat:'Hai battuto il tempo! 🎉',lost:'Non hai battuto il tempo. Riprova! ✨',equal:'Pareggio perfetto! 🤝',noWeb:'Per inviare una sfida agli amici, pubblica prima la PWA su GitHub Pages (HTTPS).',linkCopied:'Link copiato! Invialo a un amico.',copyFailed:'Non posso copiare automaticamente. Copia il link dalla barra del browser.',invite:'Accetta la sfida',noticeInstall:'Installa l’app per giocare più comodamente.',iosHelp:'Su iPhone: apri questa pagina in Safari, tocca Condividi e scegli “Aggiungi alla schermata Home”, quindi conferma.',androidHelp:'Su Android: apri il menu del browser (⋮), poi scegli “Installa app” o “Aggiungi a schermata Home”.',genericHelp:'Apri il menu del browser e cerca “Installa app” o “Aggiungi alla schermata Home”.',minutes:'tempo',hints:'suggerimenti',you:'Il tuo tempo'},
 en:{kicker:'YOUR LITTLE BIG GAME',ready:'Ready to play?',intro:'Six numbers and endless little challenges. A moment just for you.',difficulty:'CHOOSE YOUR LEVEL',beginner:'Beginner',beginnerDesc:'A gentle start',intermediate:'Intermediate',intermediateDesc:'A little more thinking',advanced:'Advanced',advancedDesc:'Challenge yourself',play:'Start a game',daily:'Daily challenge',stats:'My statistics',shareApp:'Share this app',received:"You've received a challenge!",installTitle:'Install 6 Sudoku',install:'Install',installWin:'⬇ Install the app',localInstall:'To install, open the version hosted on GitHub Pages (HTTPS). Local files are only for testing.',installed:'App installed!',standaloneHint:'You can launch it from your Home screen.',home:'Home',instructions:'Use numbers 1 to 6 once per row, column, and rectangle.',erase:'Erase',hint:'Hint',share:'Share',statsKicker:'YOUR PROGRESS',statsDesc:'One grid at a time.',wins:'Completed puzzles',today:'Completed today',best:'Best time',finished:'CHALLENGE COMPLETED',congrats:'Well done!',winSubtitle:"You've completed your 6 Sudoku.",challengeFriend:'🏁 Challenge a friend',newGame:'New game',whatsapp:'Send on WhatsApp',installHelp:'Install 6 Sudoku',understood:'Got it',shareTitle:'Share your challenge',shareDesc:'Choose how to send the link.',shareMenu:'Share with...',copy:'Copy link',close:'Close',footer:'A LITTLE BIG LOGIC GAME',challengeTarget:'Time to beat',dailyTitle:'Daily challenge',wrong:'That number is not correct. Try again!',selected:'Select an empty cell first.',fixed:'This is a fixed cell.',hintFeedback:'A little help! +30 seconds on your score.',hintPenalty:'Hint penalty',beat:'You beat the time! 🎉',lost:"You didn't beat the time. Try again! ✨",equal:'A perfect tie! 🤝',noWeb:'To send a challenge, first publish the PWA on GitHub Pages (HTTPS).',linkCopied:'Link copied! Send it to a friend.',copyFailed:'Could not copy automatically. Copy the link from your browser.',invite:'Accept challenge',noticeInstall:'Install for a better experience.',iosHelp:'On iPhone: open the page in Safari, tap Share, choose “Add to Home Screen”, enable “Open as Web App” if available, and confirm.',androidHelp:'On Android: open your browser menu (⋮) and choose “Install app” or “Add to Home screen”.',genericHelp:'Open your browser menu and find “Install app” or “Add to Home screen”.',minutes:'time',hints:'hints',you:'Your time'}
};
Object.assign(T.it,{howTo:'Come si gioca?',howToTitle:'Come si gioca a 6 Sudoku?',shareChallengeDone:'🧩 Ti sfido a 6 Sudoku!\\nHo completato il livello {level} in {time} ⏱️{hints}\\nPensi di riuscire a battermi? Gioca lo stesso schema!\\n{url}',shareChallengeOpen:'🧩 Giochiamo allo stesso 6 Sudoku! Riesci a battermi?\\n{url}',shareAppMessage:'🧩 Prova 6 Sudoku, un piccolo grande gioco di logica!\\n{url}',hintsShare:' ({count} aiuti inclusi nel punteggio)'});
Object.assign(T.en,{howTo:'How to play',howToTitle:'How to play 6 Sudoku',shareChallengeDone:'🧩 I challenge you to 6 Sudoku!\\nI solved {level} in {time} ⏱️{hints}\\nCan you beat my time? Play the exact same puzzle!\\n{url}',shareChallengeOpen:'🧩 Let’s play the same 6 Sudoku! Can you beat me?\\n{url}',shareAppMessage:'🧩 Try 6 Sudoku, a little big logic game!\\n{url}',hintsShare:' ({count} hints included in the score)'});
Object.assign(T,window.SudokuLanguages||{});
Object.entries(window.Sudoku011I18n||{}).forEach(([k,v])=>Object.assign(T[k]||{},v));
const creatorCredits={it:'Ideato e sviluppato da',en:'Created and developed by',de:'Idee und Entwicklung:',fr:'Conçu et développé par',zh:'创意与开发：',ru:'Идея и разработка:'};
Object.entries(creatorCredits).forEach(([locale,credit])=>{if(T[locale])T[locale].developerCredit=credit;});
const detectLanguage=()=>{const l=(navigator.language||'it').toLowerCase();return ['it','en','de','fr','zh','ru'].find(k=>l.startsWith(k))||'en';};
const defaults={lang:detectLanguage(),level:'beginner'};
let lang=localStorage.getItem('6sudoku-lang')||defaults.lang,level=localStorage.getItem('6sudoku-level')||defaults.level;
if(!T[lang])lang='it';if(!['beginner','intermediate','advanced'].includes(level))level='beginner';
let incoming=null,game=null,selected=-1,elapsed=0,hints=0,startAt=0,timer=null,ended=false,installEvent=null,currentShare=null;
let rankLevel='intermediate',guideIndex=0,profileNext=null;
const params=new URLSearchParams(location.search);
if(/^[a-zA-Z0-9-]{4,40}$/.test(params.get('c')||'') && ['beginner','intermediate','advanced'].includes(params.get('d'))){const t=Number(params.get('t'));incoming={id:params.get('c'),level:params.get('d'),target:params.has('t')&&Number.isInteger(t)&&t>=1&&t<=86400?t:null};level=incoming.level;}
function txt(key){return T[lang][key]||key;}
function format(n){n=Math.max(0,Math.floor(n));return String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0');}
function applyLanguage(){document.documentElement.lang=lang;$$('[data-text]').forEach(e=>e.textContent=txt(e.dataset.text));$('#language').value=lang;localizeCountryNames();$$('[data-level]').forEach(e=>{e.classList.toggle('selected',e.dataset.level===level);e.setAttribute('aria-pressed',e.dataset.level===level?'true':'false');});$('#startFree').textContent=incoming?txt('invite'):txt('play');if(incoming){$('#challengeIncoming').hidden=false;$('#incomingTarget').textContent=incoming.target?`${txt('challengeTarget')}: ${format(incoming.target)} · ${txt(level)}`:txt(level);}if(game){$('#gameTitle').textContent=game.daily?txt('dailyTitle'):txt(game.level);updateTarget();}showInstall();if($('#rulesDialog').open)renderRules();if(!$('#leaderboardScreen').hidden)renderLeaderboard();if($('#iphoneGuideDialog').open)renderGuide();if($('#profileDialog').open)previewProfile();}
function drawDecor(){let vals=[2,0,5,1,0,6,0,4,0,3,2,0,4,1,0,6,0,3,0,6,2,0,5,1,3,0,4,2,0,5,0,5,1,0,6,4];$('#decorBoard').innerHTML=vals.map(n=>`<div class="decor-cell">${n||''}</div>`).join('');}
function showScreen(which){$$('.screen').forEach(s=>s.hidden=s.id!==which);if(which==='statsScreen')showStats();if(which==='leaderboardScreen')renderLeaderboard();}
function updateTarget(){if(!game)return;$('#targetBar').hidden=!game.target;$('#targetText').textContent=game.target?txt('challengeTarget')+': '+format(game.target):'';}
function newId(){if(window.crypto&&crypto.getRandomValues){const a=new Uint32Array(2);crypto.getRandomValues(a);return 'R'+Array.from(a,n=>n.toString(36)).join('-');}return 'R'+Math.random().toString(36).slice(2,12);}
function play(mode){
 if(mode==='daily'&&!standalone()){openDailyGate();return;}
 if(mode==='daily'&&!getProfile()){askProfile(()=>play('daily'));return;}
 if(mode==='daily'&&readDailyResult(level)){alert(txt('dayPlayed'));showScreen('leaderboardScreen');return;}
 const id=mode==='incoming'&&incoming?incoming.id:mode==='daily'?'D-'+new Date().toISOString().slice(0,10):newId();
 const modeLevel=mode==='incoming'&&incoming?incoming.level:level;
 const puzzle=SudokuEngine.generate(id,modeLevel);
 game={...puzzle,original:puzzle.puzzle.slice(),cells:puzzle.puzzle.slice(),target:mode==='incoming'&&incoming?incoming.target:null,daily:mode==='daily'||id.startsWith('D-'),ranked:mode==='daily',usedHint:false};
 selected=-1;elapsed=0;hints=0;ended=false;startAt=Date.now();clearInterval(timer);timer=setInterval(tick,200);$('#clock').textContent='00:00';$('#feedback').textContent='';$('#gameTitle').textContent=game.daily?txt('dailyTitle'):txt(modeLevel);incoming=null;$('#challengeIncoming').hidden=true;$('#startFree').textContent=txt('play');updateTarget();renderGrid();showScreen('gameScreen');
}
function tick(){if(!game||ended)return;elapsed=Math.max(0,Math.floor((Date.now()-startAt)/1000));$('#clock').textContent=format(elapsed);}
function renderGrid(){if(!game)return;$('#sudokuGrid').innerHTML=game.cells.map((v,i)=>{
 const given=game.original[i]!==0,wrong=v!==0&&v!==game.solution[i];
 const classes=['sudoku-cell',given?'given':'',i===selected?'selected':'',wrong?'error':''].filter(Boolean).join(' ');
 return `<button class="${classes}" data-cell="${i}" role="gridcell" aria-label="${Math.floor(i/6)+1}, ${i%6+1}, ${v||'vuota'}" ${ended?'disabled':''}>${v||''}</button>`;
 }).join('');
 $$('#sudokuGrid button').forEach(b=>b.addEventListener('click',()=>{if(ended)return;const i=Number(b.dataset.cell);if(game.original[i]){$('#feedback').textContent=txt('fixed');return;}selected=i;renderGrid();}));
}
function enter(n){if(!game||ended)return;if(selected<0||game.original[selected]){$('#feedback').textContent=txt('selected');return;}game.cells[selected]=n;$('#feedback').textContent=n&&n!==game.solution[selected]?txt('wrong'):'';renderGrid();checkWin();}
function help(){if(!game||ended)return;if(game.ranked){$('#feedback').textContent=txt('rankHint');return;}let empties=game.cells.map((v,i)=>!game.original[i]&&game.cells[i]!==game.solution[i]?i:-1).filter(i=>i>=0);if(!empties.length)return;let pick=selected>=0&&empties.includes(selected)?selected:empties[0];selected=pick;game.cells[pick]=game.solution[pick];hints++;$('#feedback').textContent=txt('hintFeedback');renderGrid();checkWin();}
function checkWin(){if(ended||!game.cells.every((v,i)=>v===game.solution[i]))return;tick();ended=true;clearInterval(timer);const total=elapsed+hints*30;recordScore(total);if(game.ranked)saveDailyResult(game.level,total);
 $('#resultTime').textContent=format(total);
 $('#resultMeta').textContent=txt(game.level)+(hints?' · '+hints+' '+txt('hints')+' (+30s)':'');
 $('#challengeResult').hidden=!game.target;
 if(game.target){$('#challengeResult').textContent=total<game.target?txt('beat'):total===game.target?txt('equal'):txt('lost');}
 $('#winDialog').showModal();renderGrid();
}
function recordScore(total){try{const k='6sudoku-stats';let s=JSON.parse(localStorage.getItem(k)||'{}');let today=new Date().toLocaleDateString('en-CA');s.wins=(Number(s.wins)||0)+1;s.best=s.best===undefined?total:Math.min(s.best,total);s.daily=s.daily&&typeof s.daily==='object'?s.daily:{};s.daily[today]=(Number(s.daily[today])||0)+1;localStorage.setItem(k,JSON.stringify(s));}catch(e){}}
function showStats(){let s={};try{s=JSON.parse(localStorage.getItem('6sudoku-stats')||'{}');}catch(e){}$('#statWins').textContent=s.wins||0;$('#statToday').textContent=s.daily?.[new Date().toLocaleDateString('en-CA')]||0;$('#statBest').textContent=s.best===undefined?'—':format(s.best);}
function challengeLink(){const u=new URL('./',location.href);u.search='';u.hash='';if(game){u.searchParams.set('c',game.id);u.searchParams.set('d',game.level);if(ended)u.searchParams.set('t',String(elapsed+hints*30));}return u.href;}
function ensureLink(message,url){return message.includes(url)?message:message.trimEnd()+'\n'+url;}
function buildShare(appOnly=false){
 const template=(key,vars)=>txt(key).replace(/\{(\w+)\}/g,(_,k)=>vars[k]??'').replace(/\\n/g,'\n');
 if(!appOnly&&game){
  const url=challengeLink();
  const message=ended?template('shareChallengeDone',{level:txt(game.level),time:format(elapsed+hints*30),hints:hints?template('hintsShare',{count:hints}):'',url}):template('shareChallengeOpen',{url});
  return {url,message:ensureLink(message,url),title:'6 Sudoku'};
 }
 const url=new URL('./',location.href).href;
 return {url,message:ensureLink(template('shareAppMessage',{url}),url),title:'6 Sudoku'};
}
function canShare(){return location.protocol==='https:'||location.hostname==='localhost';}
function shareOpen(appOnly=false){if(!canShare()){$('#feedback').textContent=txt('noWeb');if(!game)alert(txt('noWeb'));return;}currentShare=buildShare(appOnly);$('#shareDialog').showModal();}
async function nativeShare(){if(!currentShare)return;if(navigator.share){try{await navigator.share({title:currentShare.title,text:currentShare.message});$('#shareDialog').close();return;}catch(e){if(e.name==='AbortError')return;}}await copyLink();}
async function copyLink(){if(!currentShare)return;try{await navigator.clipboard.writeText(currentShare.url);$('#shareDialog').close();$('#feedback').textContent=txt('linkCopied');}catch(e){window.prompt(txt('copy'),currentShare.url);}}
function whatsApp(){if(!currentShare)return;window.open('https://wa.me/?text='+encodeURIComponent(currentShare.message),'_blank','noopener,noreferrer');$('#shareDialog').close();}
function standalone(){return matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;}
function helpInstall(){const ua=navigator.userAgent||'';return /iPad|iPhone|iPod/.test(ua)?txt('iosHelp'):/Android/.test(ua)?txt('androidHelp'):txt('genericHelp');}
function showInstall(){
 const isInstalled=standalone();
 $('#installBox').hidden=isInstalled;
 $('#winInstall').hidden=isInstalled;
 $('#installInstructions').textContent=canShare()?txt('noticeInstall'):txt('localInstall');
}
function openInstallInfo(){
 // The install prompt can only be displayed after a real user gesture.
 if(installEvent){const pending=installEvent;installEvent=null;pending.prompt();return;}
 $('#manualHelp').textContent=canShare()?helpInstall():txt('localInstall');
 $('#installDialog').showModal();
}
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installEvent=e;showInstall();});
window.addEventListener('appinstalled',()=>{installEvent=null;showInstall();});
function renderRules(){
 const content=$('#rulesContent');content.replaceChildren();
 const steps=(window.SudokuRules||{})[lang]||(window.SudokuRules||{}).it||[];
 steps.forEach(([heading,detail],i)=>{
  const section=document.createElement('section');
  const title=document.createElement('h3');title.textContent=(i+1)+'. '+heading;
  const para=document.createElement('p');para.textContent=detail;
  section.append(title,para);content.append(section);
 });
}
function openRules(){renderRules();$('#rulesDialog').showModal();}

// v0.11: Profile and ranking are local demo data. No fabricated online players.
function safeLoad(key){try{return JSON.parse(localStorage.getItem(key)||'null');}catch(e){return null;}}
function safeSave(key,value){try{localStorage.setItem(key,JSON.stringify(value));}catch(e){}}
function getPlayerId(){let id=localStorage.getItem('6sudoku-player-id');if(!id){id='P-'+newId();try{localStorage.setItem('6sudoku-player-id',id);}catch(e){}}return id;}
function getProfile(){const p=safeLoad('6sudoku-profile');return p&&p.nickname&&p.id?p:null;}
function askProfile(done){profileNext=done||null;const p=getProfile();$('#profileName').value=p?.nickname||'';$('#profileCountry').value=p?.country||'';$('#profileError').textContent='';previewProfile();$('#profileDialog').showModal();}
function localizeCountryNames(){
 const select=$('#profileCountry');if(!select)return;
 let display=null;try{display=new Intl.DisplayNames([lang==='zh'?'zh-CN':lang],{type:'region'});}catch(e){}
 Array.from(select.options).forEach(opt=>{const code=opt.value;if(code==='')opt.textContent=txt('noCountry');else if(code==='OTHER')opt.textContent='🌍 '+({it:'Altro',en:'Other',de:'Andere',fr:'Autre',zh:'其他',ru:'Другое'}[lang]);else opt.textContent=countryFlag(code)+' '+(display?.of(code)||code);});
}
function countryFlag(code){if(!code||code==='OTHER')return '🌍';return /^[A-Z]{2}$/.test(code)?String.fromCodePoint(...code.split('').map(x=>127397+x.charCodeAt(0))):'🌍';}
function previewProfile(){$('#profilePreview').textContent=($('#profileName').value.trim()||txt('demoPlayer'))+' '+countryFlag($('#profileCountry').value);}
function saveProfile(){const nick=$('#profileName').value.trim();if(Array.from(nick).length<2||Array.from(nick).length>16){$('#profileError').textContent=txt('profileInvalid');return;}safeSave('6sudoku-profile',{id:getPlayerId(),nickname:nick,country:$('#profileCountry').value});$('#profileDialog').close();if(profileNext){const done=profileNext;profileNext=null;done();}else renderLeaderboard();}
function dailyKey(lev){return '6sudoku-daily-'+new Date().toISOString().slice(0,10)+'-'+lev;}
function saveDailyResult(lev,time){safeSave(dailyKey(lev),{time,id:getPlayerId(),date:new Date().toISOString().slice(0,10),level:lev});}
function readDailyResult(lev){return safeLoad(dailyKey(lev));}
function renderLeaderboard(){const date=new Date().toISOString().slice(0,10);$('#rankingDay').textContent=txt('rankDate').replace('{date}',date);$$('[data-rank-level]').forEach(b=>{b.classList.toggle('active',b.dataset.rankLevel===rankLevel);b.setAttribute('aria-pressed',String(b.dataset.rankLevel===rankLevel));});const rows=$('#rankingRows');rows.replaceChildren();const p=getProfile(),r=readDailyResult(rankLevel);if(r&&p&&r.id===p.id){const row=document.createElement('div');row.className='ranking-row own';const name=document.createElement('div');name.className='ranking-name';const strong=document.createElement('strong');strong.textContent=p.nickname+' '+countryFlag(p.country);const self=document.createElement('span');self.className='own-tag';self.textContent='· '+txt('thatsYou');name.append(strong,self);const time=document.createElement('strong');time.className='ranking-time';time.textContent=format(r.time);row.append(name,time);rows.append(row);}else{const empty=document.createElement('p');empty.className='ranking-empty';empty.textContent=txt('noDailyYet');rows.append(empty);}}
function openDailyGate(){if(standalone()){if(!getProfile())askProfile(()=>play('daily'));else play('daily');return;}$('#dailyGateDialog').showModal();}
function showGuide(){if($('#dailyGateDialog').open)$('#dailyGateDialog').close();guideIndex=0;renderGuide();$('#iphoneGuideDialog').showModal();}
function renderGuide(){const n=guideIndex+1;$('#guideStepNum').textContent=txt('stepCounter').replace('{current}',String(n)).replace('{total}','5');$('#guideStepTitle').textContent=txt('iosStep'+n+'Title');$('#guideStepBody').textContent=txt('iosStep'+n+'Body');const symbols=['◉','⬆','⊞','✓','6'];$('#guideVisual').textContent=symbols[guideIndex];$('#guidePrev').disabled=guideIndex===0;$('#guideNext').textContent=guideIndex===4?txt('finishGuide'):txt('next');}

function init(){drawDecor();applyLanguage();showScreen('homeScreen');
 $$('#numberPad button').forEach(b=>b.onclick=()=>enter(Number(b.dataset.digit)));
 $$('.level').forEach(b=>b.onclick=()=>{level=b.dataset.level;localStorage.setItem('6sudoku-level',level);incoming=null;$('#challengeIncoming').hidden=true;applyLanguage();});
 $('#language').onchange=e=>{lang=T[e.target.value]?e.target.value:'it';try{localStorage.setItem('6sudoku-lang',lang);}catch(err){}applyLanguage();};
 $('#startFree').onclick=()=>play(incoming?'incoming':'free');$('#startDaily').onclick=openDailyGate;
 $('#backHome').onclick=()=>{clearInterval(timer);game=null;showScreen('homeScreen');};
 $('#erase').onclick=()=>enter(0);$('#hint').onclick=help;$('#sharePuzzle').onclick=()=>shareOpen(false);$('#shareApp').onclick=()=>shareOpen(true);
 $('#openRules').onclick=openRules;$('#gameRules').onclick=openRules;
 $('#rulesClose').onclick=()=>$('#rulesDialog').close();
 $('#openLeaderboard').onclick=()=>showScreen('leaderboardScreen');$('#leaderboardBack').onclick=()=>showScreen('homeScreen');$('#rankingDaily').onclick=openDailyGate;$$('[data-rank-level]').forEach(b=>b.onclick=()=>{rankLevel=b.dataset.rankLevel;renderLeaderboard();});
 $('#gateClose').onclick=()=>$('#dailyGateDialog').close();$('#gateGuide').onclick=showGuide;$('#gateInstall').onclick=()=>{$('#dailyGateDialog').close();openInstallInfo();};
 $('#guideClose').onclick=()=>$('#iphoneGuideDialog').close();$('#guidePrev').onclick=()=>{guideIndex=Math.max(0,guideIndex-1);renderGuide();};$('#guideNext').onclick=()=>{if(guideIndex===4){$('#iphoneGuideDialog').close();return;}guideIndex++;renderGuide();};
 $('#profileName').oninput=previewProfile;$('#profileCountry').onchange=previewProfile;$('#profileSave').onclick=saveProfile;$('#profileCancel').onclick=()=>{profileNext=null;$('#profileDialog').close();};
 $('#openStats').onclick=()=>showScreen('statsScreen');$('#statsBack').onclick=()=>showScreen('homeScreen');
 $('#challengeFriend').onclick=()=>shareOpen(false);$('#whatsapp').onclick=()=>{if(!canShare()){$('#winDialog').close();alert(txt('noWeb'));return;}currentShare=buildShare(false);whatsApp();};
 $('#newGame').onclick=()=>{$('#winDialog').close();play('free');};$('#goHome').onclick=()=>{$('#winDialog').close();clearInterval(timer);game=null;showScreen('homeScreen');};
 $('#shareNative').onclick=nativeShare;$('#shareWa').onclick=whatsApp;$('#shareCopy').onclick=copyLink;$('#shareClose').onclick=()=>$('#shareDialog').close();
 $('#installNow').onclick=openInstallInfo;$('#winInstall').onclick=()=>{if($('#winDialog').open)$('#winDialog').close();openInstallInfo();};$('#tipClose').onclick=()=>$('#installDialog').close();
 $('#winDialog').addEventListener('cancel',e=>e.preventDefault());
 if('serviceWorker' in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('./service-worker.js').catch(()=>{});
}
init();
})();
