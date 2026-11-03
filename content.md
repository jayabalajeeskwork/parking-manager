 <div class="card"><b>Revenue &amp; expenses · ${mlabel(month)}</b>${[['Rent collected',col],['In-slips used',null,D.n],['Cash',D.cash],['PayTM',D.pt],['Overtime (included)',D.ot],['Short amount',D.short],['Daily collection total',D.total]].map(a=>`<div class="item"><div class="m">${a[0]}</div><b${a[0]==='Short amount'?' style="color:var(--er)"':''}>${a[1]===null?a[2]:inr(a[1])}</b></div>`).join('')}
  <div class="item tot"><div class="m">Total revenue<div class="mu sm" style="font-weight:400">Rent ${inr(col)} + daily ${inr(D.total)}</div></div><span style="color:var(--ok);font-size:18px">${inr(col+D.total)}</span></div>
  <div class="item"><div class="m">Total expenses</div><b style="color:var(--er)">− ${inr(X)}</b></div>
  <div class="item tot"><div class="m">Net (revenue − expenses)</div><span style="color:${col+D.total-X<0?'var(--er)':'var(--ok)'};font-size:18px">${inr(col+D.total-X)}</span></div></div>


  function ym(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')}
function idx(m){const[a,b]=m.split('-').map(Number);return a*12+b-1}
function shift(m,n){const i=idx(m)+n;return Math.floor(i/12)+'-'+String(i%12+1).padStart(2,'0')}
function mlabel(m){const[a,b]=m.split('-');return new Date(a,b-1,1).toLocaleString('en-IN',{month:'long',year:'numeric'})}
const inr=n=>'₹'+Math.round(n).toLocaleString('en-IN');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const today=()=>new Date().toLocaleDateString('en-CA');
const snap=t=>t.slice(0,14)+String(Math.floor(+t.slice(14,16)/15)*15).padStart(2,'0');
const nowDT=()=>today()+'T'+new Date().toTimeString().slice(0,5);