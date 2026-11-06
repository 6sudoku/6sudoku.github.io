/* 6 Sudoku — motore locale deterministico, nessuna dipendenza. */
(function (root) {
  'use strict';
  const SIZE=6, FULL=0b1111110;
  function hash(text) { let h=2166136261; for(let i=0;i<text.length;i++){h^=text.charCodeAt(i);h=Math.imul(h,16777619);} return h>>>0; }
  function random(seed) { let a=seed>>>0; return () => { a=(a+0x6D2B79F5)>>>0; let t=a; t=Math.imul(t^(t>>>15),t|1); t^=t+Math.imul(t^(t>>>7),t|61); return ((t^(t>>>14))>>>0)/4294967296; }; }
  function shuffle(list, rand) { const a=list.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(rand()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
  function block(r,c) { return 2*Math.floor(r/2)+Math.floor(c/3); }
  function validSolution(board) {
    if(!Array.isArray(board)||board.length!==36)return false;
    for(let r=0;r<6;r++){
      const row=new Set(),col=new Set(); for(let c=0;c<6;c++){row.add(board[r*6+c]);col.add(board[c*6+r]);} if(row.size!==6||col.size!==6||![...row,...col].every(v=>v>=1&&v<=6))return false;
    }
    for(let br=0;br<3;br++)for(let bc=0;bc<2;bc++){const s=new Set();for(let r=0;r<2;r++)for(let c=0;c<3;c++)s.add(board[(br*2+r)*6+bc*3+c]);if(s.size!==6)return false;}return true;
  }
  function createSolution(rand){
    let nums=shuffle([1,2,3,4,5,6],rand);
    let rb=shuffle([0,1,2],rand),cs=shuffle([0,1],rand);
    let rows=rb.flatMap(b=>shuffle([2*b,2*b+1],rand));
    let cols=cs.flatMap(s=>shuffle([3*s,3*s+1,3*s+2],rand));
    return rows.flatMap(r=>cols.map(c=>nums[(3*(r%2)+Math.floor(r/2)+c)%6]));
  }
  function candidateMask(board,r,c){
    let used=0;for(let k=0;k<6;k++){used|=1<<(board[r*6+k]||0);used|=1<<(board[k*6+c]||0);}
    const sr=2*Math.floor(r/2),sc=3*Math.floor(c/3);
    for(let y=sr;y<sr+2;y++)for(let x=sc;x<sc+3;x++)used|=1<<(board[y*6+x]||0);
    return FULL & ~used;
  }
  function countSolutions(board,stopAt=2){
    const b=board.slice();let total=0;
    function visit(){
      if(total>=stopAt)return;
      let best=-1,bestMask=0,min=7;
      for(let i=0;i<36;i++)if(!b[i]){const m=candidateMask(b,Math.floor(i/6),i%6);let ct=0;for(let n=1;n<=6;n++)ct+=(m>>n)&1;if(ct===0)return;if(ct<min){min=ct;best=i;bestMask=m;if(ct===1)break;}}
      if(best===-1){total++;return;}
      for(let n=1;n<=6;n++)if(bestMask&(1<<n)){b[best]=n;visit();b[best]=0;if(total>=stopAt)return;}
    }
    visit();return total;
  }
  function generate(id,level){
    const r=random(hash('6sudoku-v02:'+id+':'+level));
    const solution=createSolution(r);
    const targets={beginner:13,intermediate:19,advanced:23};let wanted=targets[level]||13;
    const board=solution.slice();const order=shuffle(Array.from({length:36},(_,i)=>i),r);
    let removed=0;
    for(const i of order){if(removed>=wanted)break;const value=board[i];board[i]=0;if(countSolutions(board,2)===1){removed++;}else{board[i]=value;}}
    return {id,level,puzzle:board,solution,removed,unique:countSolutions(board,2)===1};
  }
  function possible(board,index){if(board[index])return [];let mask=candidateMask(board,Math.floor(index/6),index%6);return [1,2,3,4,5,6].filter(n=>mask&(1<<n));}
  root.SudokuEngine={generate,countSolutions,possible,validSolution,block};
})(typeof window!=='undefined'?window:globalThis);
