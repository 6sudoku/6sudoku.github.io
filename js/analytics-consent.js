/* 6 Sudoku — Basic Consent Mode v2, GA4. No tag/network until opted in. */
(() => {
 'use strict';
 const GA_ID='G-E1BXTG6W8R';
 const KEY='6sudoku-ga4-consent-v1';
 const SAFE_EVENTS=new Set(['game_start','game_complete','daily_challenge_start','daily_challenge_complete','challenge_invite_sent','challenge_complete']);
 const $=id=>document.getElementById(id);
 const getChoice=()=>{try{const value=JSON.parse(localStorage.getItem(KEY));return value?.choice==='accepted'||value?.choice==='declined'?value.choice:null}catch(_){return null}};
 let choice=getChoice(),loaded=false,opening=false;
 const getLang=()=>window.I18N?.[$('language')?.value]||window.I18N?.it||{};
 const t=key=>getLang()[key]||window.I18N?.it?.[key]||key;
 const labels={bannerTitle:'bannerTitle',bannerBody:'bannerBody',bannerDetails:'bannerDetails',decline:'decline',accept:'accept',readPrivacy:'readPrivacy',settingsHeading:'settingsHeading',settingsBody:'settingsBody',currentLabel:'currentLabel',changeChoice:'changeChoice',googlePrivacy:'googlePrivacy'};
 function refresh(){for(const el of document.querySelectorAll('[data-analytics-t]')){const key=el.dataset.analyticsT;const val=t(key);if(val&&val!==key)el.textContent=val}const status=$('analyticsConsentStatus');if(status){const k=choice==='accepted'?'statusAccepted':choice==='declined'?'statusDeclined':'statusUnknown';status.textContent=t(k);}}
 function setupDataLayer(){window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments)}}
 function loadGA(){if(loaded||choice!=='accepted')return;loaded=true;
  setupDataLayer();
  window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  window.gtag('set','ads_data_redaction',true);
  window.gtag('consent','update',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  window.gtag('js',new Date());
  window.gtag('config',GA_ID,{send_page_view:false,page_location:location.origin+location.pathname,page_referrer:'',allow_google_signals:false,allow_ad_personalization_signals:false});
  // Never send query strings, URL fragments or referrers (the invite URL includes secret tokens).
  window.gtag('event','page_view',{page_location:location.origin+location.pathname,page_referrer:'',page_title:'6 Sudoku'});
  const script=document.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(GA_ID);
  document.head.appendChild(script);
 }
 function clearAnalyticsCookies(){
  const names=document.cookie.split(';').map(x=>x.trim().split('=')[0]).filter(x=>/^_ga($|_)|^_gid$|^_gat/.test(x));
  const host=location.hostname;const domains=['',host,'.'+host];
  for(const n of names)for(const domain of domains)for(const path of ['/','']){
   document.cookie=n+'=; Max-Age=0; SameSite=Lax'+(domain?'; Domain='+domain:'')+(path?'; Path='+path:'');
  }
 }
 function store(next){try{localStorage.setItem(KEY,JSON.stringify({choice:next,at:new Date().toISOString(),revision:1}))}catch(_){}}
 function choose(next){const was=choice;choice=next;store(next);const dialog=$('analyticsConsentDialog');if(dialog?.open)dialog.close();refresh();if(next==='accepted'){loadGA()}else{clearAnalyticsCookies();if(was==='accepted'&&loaded){ // Remove running tag by reloading with the new denied preference.
    location.reload();return;
   }}
 }
 function showMain(){const main=$('analyticsConsentMain'),details=$('analyticsConsentDetails');if(main)main.hidden=false;if(details)details.hidden=true;}
 function open(){showMain();refresh();const dialog=$('analyticsConsentDialog');if(dialog&&!dialog.open){try{dialog.showModal()}catch(_){dialog.setAttribute('open','')}}}
 function dedupe(event,localKey){if(!SAFE_EVENTS.has(event)||choice!=='accepted'||!loaded)return false;
  // Remember completion/start markers only in this tab, never transmit identifiers.
  if(localKey){const key='6sudoku-ga4-event-'+event+'-'+String(localKey);try{if(sessionStorage.getItem(key))return false;sessionStorage.setItem(key,'1')}catch(_){}}
  return true;
 }
 function emit(event,details={},localKey=''){
  if(!dedupe(event,localKey))return;
  const data={};
  if(['free','daily','vs1_creator','vs1_opponent'].includes(details.game_mode))data.game_mode=details.game_mode;
  if(['beginner','intermediate','advanced','hero'].includes(details.difficulty))data.difficulty=details.difficulty;
  if(Number.isFinite(details.duration_seconds)&&details.duration_seconds>=0)data.duration_seconds=Math.min(86400,Math.round(details.duration_seconds));
  try{window.gtag('event',event,data)}catch(_){/* analytics never interrupts the game */}
 }
 window.SudokuAnalytics={emit,refresh,hasConsent:()=>choice==='accepted'};
 function init(){refresh();$('analyticsAccept')?.addEventListener('click',()=>choose('accepted'));$('analyticsDecline')?.addEventListener('click',()=>choose('declined'));
  $('analyticsConsentOpen')?.addEventListener('click',()=>{const privacy=$('privacyDialog');if(privacy?.open)privacy.close();open()});
  $('analyticsReadDetails')?.addEventListener('click',()=>{const main=$('analyticsConsentMain'),details=$('analyticsConsentDetails');if(main)main.hidden=true;if(details)details.hidden=false;});
  $('analyticsDetailsBack')?.addEventListener('click',showMain);
  $('analyticsReadPrivacy')?.addEventListener('click',()=>{const consent=$('analyticsConsentDialog');if(consent?.open)consent.close();const privacy=$('privacyDialog');if(privacy){privacy.addEventListener('close',()=>{if(choice===null)open()},{once:true});privacy.showModal();}});
  $('language')?.addEventListener('change',()=>queueMicrotask(refresh));
  window.addEventListener('storage',event=>{if(event.key!==KEY)return;const incoming=getChoice();if(incoming===choice)return;const before=choice;choice=incoming;refresh();if(before==='accepted'&&incoming!=='accepted'){clearAnalyticsCookies();location.reload()}else if(incoming==='accepted')loadGA();else if(incoming===null)open()});
  // GA4 never loads when consent is rejected/unset, not even on page refresh.
  if(choice==='accepted')loadGA();else if(choice===null){open()}
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
