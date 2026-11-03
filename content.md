// ---------- yearly summary ----------
function yearView(){
  let E=0,C=0;const yy=String(yr);
  const rows=Array.from({length:12},(_,i)=>{
    const m=yy+'-'+String(i+1).padStart(2,'0'),e=tenants.filter(t=>active(t,m)).reduce((s,t)=>s+t.rent,0),c=sum(payments.filter(p=>p.kind==='rent'&&p.month===m));E+=e;C+=c;
    const w=e?Math.min(100,c/e*100):0;
    return`<div class="item"><div style="width:34px" class="mu sm">${mlabel(m).slice(0,3)}</div><div class="m"><div class="bar" style="margin:0"><i style="width:${w}%"></i></div></div><div class="sm" style="text-align:right;min-width:112px">${inr(c)} / ${inr(e)}</div></div>`}).join('');
  const Y={n:0,cash:0,pt:0,ot:0,short:0,total:0};let XT=0;
  const mrows=Array.from({length:12},(_,i)=>{const m=yy+'-'+String(i+1).padStart(2,'0'),r=sum(payments.filter(p=>p.kind==='rent'&&p.month===m)),D=dsum(m),x=sum(inMonth(expenses,m));
    Y.n+=D.n;Y.cash+=D.cash;Y.pt+=D.pt;Y.ot+=D.ot;Y.short+=D.short;Y.total+=D.total;XT+=x;return{m,r,d:D.total,x,net:r+D.total-x}});
  const mtab=mrows.map(o=>`<div class="yr"><span>${mlabel(o.m).slice(0,3)}</span><span>${inr(o.r)}</span><span>${inr(o.d)}</span><span>${inr(o.x)}</span><b style="color:${o.net<0?'var(--er)':'var(--ok)'}">${inr(o.net)}</b></div>`).join('');
  const rev=C+Y.total,net=rev-XT;
  const yp=k=>sum(payments.filter(p=>p.kind===k&&(p.date||'').startsWith(yy)));
  const trows=tenants.map(t=>{let n=0;for(let i=1;i<=12;i++)if(active(t,yy+'-'+String(i).padStart(2,'0')))n++;
    const paid=sum(pays(t,'rent').filter(p=>p.month.startsWith(yy))),bal=t.rent*n-paid;return n?{t,paid,bal}:null}).filter(Boolean).sort((a,b)=>a.t.slot-b.t.slot).map(({t,paid,bal})=>
    `<div class="item"><div class="slot">${esc(t.slot)}</div><div class="m"><div><b>${esc(t.name)}</b></div><div class="mu sm">Paid ${inr(paid)}</div></div>${bal>0?`<span class="chip unp">${inr(bal)} short</span>`:'<span class="chip paid">Clear</span>'}</div>`).join('');
  return`<h1>Yearly summary</h1>
  <div class="mon"><button class="sq" onclick="yr--;render()">‹</button><b>${yr}</b><button class="sq" onclick="yr++;render()">›</button></div>
  <div class="grid"><div class="card"><div class="mu sm">Rent collected</div><div class="big" style="color:var(--ok)">${inr(C)}</div></div><div class="card"><div class="mu sm">Rent short</div><div class="big" style="color:var(--er)">${inr(Math.max(0,E-C))}</div></div>
  <div class="card"><div class="mu sm">Late fees collected</div><div class="big">${inr(yp('latefee'))}</div></div><div class="card"><div class="mu sm">Deposits in / out</div><div class="big" style="font-size:16px">${inr(yp('deposit'))} / ${inr(yp('refund'))}</div></div></div>
  <div class="grid"><div class="card"><div class="mu sm">Daily collection</div><div class="big">${inr(Y.total)}</div><div class="mu sm">${Y.n} slips</div></div><div class="card"><div class="mu sm">Total revenue</div><div class="big" style="color:var(--ok)">${inr(rev)}</div><div class="mu sm">Rent + daily</div></div>
  <div class="card"><div class="mu sm">Total expenses</div><div class="big" style="color:var(--er)">${inr(XT)}</div></div><div class="card"><div class="mu sm">Net</div><div class="big" style="color:${net<0?'var(--er)':'var(--ok)'}">${inr(net)}</div></div></div>
  <div class="card"><div class="mu sm">Daily collection split</div><div class="item"><div class="m">Cash</div><b>${inr(Y.cash)}</b></div><div class="item"><div class="m">PayTM</div><b>${inr(Y.pt)}</b></div><div class="item"><div class="m">Overtime (included)</div><b>${inr(Y.ot)}</b></div><div class="item"><div class="m">Short amount</div><b style="color:var(--er)">${inr(Y.short)}</b></div></div>
  <div class="card" style="overflow-x:auto"><div class="mu sm">Month-wise revenue &amp; expenses</div><div style="min-width:400px"><div class="yr mu"><span></span><span>Rent</span><span>Daily</span><span>Expenses</span><span>Net</span></div>${mtab}</div></div>
  <div class="card"><div class="mu sm">Collected / expected per month</div>${rows}</div>
  <div class="card"><div class="mu sm">Per tenant</div>${trows||'<div class="empty">No data for this year.</div>'}</div>`;
}

i yearly view i need to add 
Daily collection split

and 

Month-wise revenue &amp; expenses

example it like this

Daily collection split
Cash
₹25,000
PayTM
₹8,450
Overtime (included)
₹260
Short amount
₹120
Month-wise revenue & expenses
Rent
Daily
Expenses
Net
Jan
₹0
₹0
₹0
₹0
Feb
₹0
₹0
₹0
₹0
Mar
₹0
₹0
₹0
₹0
Apr
₹0
₹0
₹0
₹0
May
₹0
₹0
₹0
₹0
Jun
₹0
₹0
₹0
₹0
Jul
₹0
₹0
₹0
₹0
Aug
₹0
₹0
₹0
₹0
Sep
₹0
₹0
₹0
₹0
Oct
₹30,000
₹0
₹0
₹30,000
Nov
₹15,000
₹33,450
₹36,000
₹12,450
Dec
₹0
₹0
₹0
₹0

     <div className="grid">
        <div className="card">
          <div className="mu sm">
            Rent collected
          </div>

          <div
            className="big"
            style={{
              color: "var(--ok)",
            }}
          >
            {formatCurrency(
              totalCollectedRent,
            )}
          </div>
        </div>

        <div className="card">
          <div className="mu sm">
            Rent short
          </div>

          <div
            className="big"
            style={{
              color: "var(--er)",
            }}
          >
            {formatCurrency(
              rentShort,
            )}
          </div>
        </div>

        <div className="card">
          <div className="mu sm">
            Late fees collected
          </div>

          <div className="big">
            {formatCurrency(
              lateFeesCollected,
            )}
          </div>
        </div>

        <div className="card">
          <div className="mu sm">
            Deposits in / out
          </div>

          <div
            className="big"
            style={{
              fontSize: "16px",
            }}
          >
            {formatCurrency(
              depositsReceived,
            )}{" "}
            /{" "}
            {formatCurrency(
              depositsRefunded,
            )}
          </div>
        </div>
      </div>

      {/* MONTHLY */}
      <div className="card">
        <div className="mu sm">
          Collected / expected per month
        </div>

        {monthlyRows.map(
          (month) => (
            <div
              className="item"
              key={
                month.monthKey
              }
            >
              <div
                style={{
                  width: "34px",
                }}
                className="mu sm"
              >
                {
                  month.shortMonthLabel
                }
              </div>

              <div className="m">
                <div
                  className="bar"
                  style={{
                    margin: 0,
                  }}
                >
                  <i
                    style={{
                      width: `${month.percentage}%`,
                    }}
                  />
                </div>
              </div>

              <div
                className="sm"
                style={{
                  textAlign:
                    "right",
                  minWidth:
                    "112px",
                }}
              >
                {formatCurrency(
                  month.collectedRent,
                )}{" "}
                /{" "}
                {formatCurrency(
                  month.expectedRent,
                )}
              </div>
            </div>
          ),
        )}
      </div>


      this hsold come befor monthly 

           <div className="grid">
        <div className="card">
          <div className="mu sm">
            Rent collected
          </div>

          <div
            className="big"
            style={{
              color: "var(--ok)",
            }}
          >
            {formatCurrency(
              totalCollectedRent,
            )}
          </div>
        </div>

        <div className="card">
          <div className="mu sm">
            Rent short
          </div>

          <div
            className="big"
            style={{
              color: "var(--er)",
            }}
          >
            {formatCurrency(
              rentShort,
            )}
          </div>
        </div>

        <div className="card">
          <div className="mu sm">
            Late fees collected
          </div>

          <div className="big">
            {formatCurrency(
              lateFeesCollected,
            )}
          </div>
        </div>

        <div className="card">
          <div className="mu sm">
            Deposits in / out
          </div>

          <div
            className="big"
            style={{
              fontSize: "16px",
            }}
          >
            {formatCurrency(
              depositsReceived,
            )}{" "}
            /{" "}
            {formatCurrency(
              depositsRefunded,
            )}
          </div>
        </div>
      </div>

      {/* MONTHLY */}
      <div className="card">
        <div className="mu sm">
          Collected / expected per month
        </div>

        {monthlyRows.map(
          (month) => (
            <div
              className="item"
              key={
                month.monthKey
              }
            >
              <div
                style={{
                  width: "34px",
                }}
                className="mu sm"
              >
                {
                  month.shortMonthLabel
                }
              </div>

              <div className="m">
                <div
                  className="bar"
                  style={{
                    margin: 0,
                  }}
                >
                  <i
                    style={{
                      width: `${month.percentage}%`,
                    }}
                  />
                </div>
              </div>

              <div
                className="sm"
                style={{
                  textAlign:
                    "right",
                  minWidth:
                    "112px",
                }}
              >
                {formatCurrency(
                  month.collectedRent,
                )}{" "}
                /{" "}
                {formatCurrency(
                  month.expectedRent,
                )}
              </div>
            </div>
          ),
        )}
      </div>

import React from "react";

function Year({
  tenants,
  payments,
  year,
  onYear,
}) {
  const getMonthKey = (monthIndex) => {
    return `${year}-${String(
      monthIndex + 1,
    ).padStart(2, "0")}`;
  };

  const getMonthLabel = (monthKey) => {
    const [
      yearValue,
      monthValue,
    ] = monthKey.split("-");

    return new Date(
      Number(yearValue),
      Number(monthValue) - 1,
      1,
    ).toLocaleString("en-IN", {
      month: "long",
      year: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return (
      "₹" +
      Math.round(
        Number(amount || 0),
      ).toLocaleString("en-IN")
    );
  };

  const getMonthIndex = (monthKey) => {
    const [
      yearValue,
      monthValue,
    ] = monthKey
      .split("-")
      .map(Number);

    return (
      yearValue * 12 +
      monthValue -
      1
    );
  };

  const isTenantActive = (
    tenant,
    monthKey,
  ) => {
    return (
      getMonthIndex(monthKey) >=
        getMonthIndex(
          tenant.start,
        ) &&
      (!tenant.end ||
        getMonthIndex(monthKey) <=
          getMonthIndex(
            tenant.end,
          ))
    );
  };

  const getTenantYearRentPayments = (
    tenant,
  ) => {
    return payments
      .filter(
        (payment) =>
          payment.tenantId ===
            tenant._id ||
          payment.tenantId ===
            tenant.id,
      )
      .filter(
        (payment) =>
          payment.kind === "rent" &&
          payment.month?.startsWith(
            String(year),
          ),
      );
  };

  const getPaymentTotal = (
    paymentList,
  ) => {
    return paymentList.reduce(
      (total, payment) =>
        total +
        Number(
          payment.amount || 0,
        ),
      0,
    );
  };

  const getYearPaymentTotal = (
    paymentType,
  ) => {
    return getPaymentTotal(
      payments.filter(
        (payment) =>
          payment.kind ===
            paymentType &&
          (payment.date || "").startsWith(
            String(year),
          ),
      ),
    );
  };

  // ----------------------------------------
  // YEAR CALCULATIONS
  // ----------------------------------------

  let totalExpectedRent = 0;
  let totalCollectedRent = 0;

  const monthlyRows = Array.from(
    { length: 12 },
    (_, index) => {
      const monthKey =
        getMonthKey(index);

      const activeTenants =
        tenants.filter((tenant) =>
          isTenantActive(
            tenant,
            monthKey,
          ),
        );

      const expectedRent =
        activeTenants.reduce(
          (total, tenant) =>
            total +
            Number(
              tenant.rent || 0,
            ),
          0,
        );

      const collectedRent =
        getPaymentTotal(
          payments.filter(
            (payment) =>
              payment.kind ===
                "rent" &&
              payment.month ===
                monthKey,
          ),
        );

      totalExpectedRent +=
        expectedRent;

      totalCollectedRent +=
        collectedRent;

      const percentage =
        expectedRent
          ? Math.min(
              100,
              (collectedRent /
                expectedRent) *
                100,
            )
          : 0;

      return {
        monthKey,
        shortMonthLabel:
          getMonthLabel(
            monthKey,
          ).slice(0, 3),
        expectedRent,
        collectedRent,
        percentage,
      };
    },
  );

  const lateFeesCollected =
    getYearPaymentTotal(
      "latefee",
    );

  const depositsReceived =
    getYearPaymentTotal(
      "deposit",
    );

  const depositsRefunded =
    getYearPaymentTotal(
      "refund",
    );

  const rentShort = Math.max(
    0,
    totalExpectedRent -
      totalCollectedRent,
  );

  // ----------------------------------------
  // TENANT SUMMARY
  // ----------------------------------------

  const tenantYearRows =
    tenants
      .map((tenant) => {
        let activeMonths = 0;

        for (
          let monthIndex = 0;
          monthIndex < 12;
          monthIndex++
        ) {
          const monthKey =
            getMonthKey(
              monthIndex,
            );

          if (
            isTenantActive(
              tenant,
              monthKey,
            )
          ) {
            activeMonths++;
          }
        }

        if (activeMonths === 0) {
          return null;
        }

        const paidRent =
          getPaymentTotal(
            getTenantYearRentPayments(
              tenant,
            ),
          );

        const expectedRent =
          Number(
            tenant.rent || 0,
          ) * activeMonths;

        const balance =
          expectedRent -
          paidRent;

        return {
          tenant,
          paidRent,
          balance,
        };
      })
      .filter(Boolean)
      .sort(
        (a, b) =>
          Number(a.tenant.slot) -
          Number(b.tenant.slot),
      );

  // ----------------------------------------
  // UI
  // ----------------------------------------

  return (
    <div className="year-page">
      <h1>Yearly summary</h1>

      <div className="mon">
        <button
          className="sq"
          onClick={() =>
            onYear(year - 1)
          }
        >
          ‹
        </button>

        <b>{year}</b>

        <button
          className="sq"
          onClick={() =>
            onYear(year + 1)
          }
        >
          ›
        </button>
      </div>

      <div className="grid">
        <div className="card">
          <div className="mu sm">
            Rent collected
          </div>

          <div
            className="big"
            style={{
              color: "var(--ok)",
            }}
          >
            {formatCurrency(
              totalCollectedRent,
            )}
          </div>
        </div>

        <div className="card">
          <div className="mu sm">
            Rent short
          </div>

          <div
            className="big"
            style={{
              color: "var(--er)",
            }}
          >
            {formatCurrency(
              rentShort,
            )}
          </div>
        </div>

        <div className="card">
          <div className="mu sm">
            Late fees collected
          </div>

          <div className="big">
            {formatCurrency(
              lateFeesCollected,
            )}
          </div>
        </div>

        <div className="card">
          <div className="mu sm">
            Deposits in / out
          </div>

          <div
            className="big"
            style={{
              fontSize: "16px",
            }}
          >
            {formatCurrency(
              depositsReceived,
            )}{" "}
            /{" "}
            {formatCurrency(
              depositsRefunded,
            )}
          </div>
        </div>
      </div>

      {/* MONTHLY */}
      <div className="card">
        <div className="mu sm">
          Collected / expected per month
        </div>

        {monthlyRows.map(
          (month) => (
            <div
              className="item"
              key={
                month.monthKey
              }
            >
              <div
                style={{
                  width: "34px",
                }}
                className="mu sm"
              >
                {
                  month.shortMonthLabel
                }
              </div>

              <div className="m">
                <div
                  className="bar"
                  style={{
                    margin: 0,
                  }}
                >
                  <i
                    style={{
                      width: `${month.percentage}%`,
                    }}
                  />
                </div>
              </div>

              <div
                className="sm"
                style={{
                  textAlign:
                    "right",
                  minWidth:
                    "112px",
                }}
              >
                {formatCurrency(
                  month.collectedRent,
                )}{" "}
                /{" "}
                {formatCurrency(
                  month.expectedRent,
                )}
              </div>
            </div>
          ),
        )}
      </div>

      {/* TENANTS */}
      <div className="card">
        <div className="mu sm">
          Per tenant
        </div>

        {tenantYearRows.length ===
        0 ? (
          <div className="empty">
            No data for this
            year.
          </div>
        ) : (
          tenantYearRows.map(
            ({
              tenant,
              paidRent,
              balance,
            }) => (
              <div
                className="item"
                key={
                  tenant._id ||
                  tenant.id
                }
              >
                <div className="slot">
                  {tenant.slot}
                </div>

                <div className="m">
                  <div>
                    <b>
                      {
                        tenant.name
                      }
                    </b>
                  </div>

                  <div className="mu sm">
                    Paid{" "}
                    {formatCurrency(
                      paidRent,
                    )}
                  </div>
                </div>

                {balance > 0 ? (
                  <span className="chip unp">
                    {formatCurrency(
                      balance,
                    )}{" "}
                    short
                  </span>
                ) : (
                  <span className="chip paid">
                    Clear
                  </span>
                )}
              </div>
            ),
          )
        )}
      </div>
    </div>
  );
}

export default Year;


import React from "react";

function Year({
  tenants,
  payments,
  year,
  onYear,
}) {
  const getMonthKey = (monthIndex) => {
    return `${year}-${String(
      monthIndex + 1,
    ).padStart(2, "0")}`;
  };

  const getMonthLabel = (monthKey) => {
    const [
      yearValue,
      monthValue,
    ] = monthKey.split("-");

    return new Date(
      Number(yearValue),
      Number(monthValue) - 1,
      1,
    ).toLocaleString("en-IN", {
      month: "long",
      year: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return (
      "₹" +
      Math.round(
        Number(amount || 0),
      ).toLocaleString("en-IN")
    );
  };

  const getMonthIndex = (monthKey) => {
    const [
      yearValue,
      monthValue,
    ] = monthKey
      .split("-")
      .map(Number);

    return (
      yearValue * 12 +
      monthValue -
      1
    );
  };

  const isTenantActive = (
    tenant,
    monthKey,
  ) => {
    return (
      getMonthIndex(monthKey) >=
        getMonthIndex(
          tenant.start,
        ) &&
      (!tenant.end ||
        getMonthIndex(monthKey) <=
          getMonthIndex(
            tenant.end,
          ))
    );
  };

  const getTenantYearRentPayments = (
    tenant,
  ) => {
    return payments
      .filter(
        (payment) =>
          payment.tenantId ===
            tenant._id ||
          payment.tenantId ===
            tenant.id,
      )
      .filter(
        (payment) =>
          payment.kind === "rent" &&
          payment.month?.startsWith(
            String(year),
          ),
      );
  };

  const getPaymentTotal = (
    paymentList,
  ) => {
    return paymentList.reduce(
      (total, payment) =>
        total +
        Number(
          payment.amount || 0,
        ),
      0,
    );
  };

  const getYearPaymentTotal = (
    paymentType,
  ) => {
    return getPaymentTotal(
      payments.filter(
        (payment) =>
          payment.kind ===
            paymentType &&
          (payment.date || "").startsWith(
            String(year),
          ),
      ),
    );
  };

  // ----------------------------------------
  // YEAR CALCULATIONS
  // ----------------------------------------

  let totalExpectedRent = 0;
  let totalCollectedRent = 0;

  const monthlyRows = Array.from(
    { length: 12 },
    (_, index) => {
      const monthKey =
        getMonthKey(index);

      const activeTenants =
        tenants.filter((tenant) =>
          isTenantActive(
            tenant,
            monthKey,
          ),
        );

      const expectedRent =
        activeTenants.reduce(
          (total, tenant) =>
            total +
            Number(
              tenant.rent || 0,
            ),
          0,
        );

      const collectedRent =
        getPaymentTotal(
          payments.filter(
            (payment) =>
              payment.kind ===
                "rent" &&
              payment.month ===
                monthKey,
          ),
        );

      totalExpectedRent +=
        expectedRent;

      totalCollectedRent +=
        collectedRent;

      const percentage =
        expectedRent
          ? Math.min(
              100,
              (collectedRent /
                expectedRent) *
                100,
            )
          : 0;

      return {
        monthKey,
        shortMonthLabel:
          getMonthLabel(
            monthKey,
          ).slice(0, 3),
        expectedRent,
        collectedRent,
        percentage,
      };
    },
  );

  const lateFeesCollected =
    getYearPaymentTotal(
      "latefee",
    );

  const depositsReceived =
    getYearPaymentTotal(
      "deposit",
    );

  const depositsRefunded =
    getYearPaymentTotal(
      "refund",
    );

  const rentShort = Math.max(
    0,
    totalExpectedRent -
      totalCollectedRent,
  );

  // ----------------------------------------
  // TENANT SUMMARY
  // ----------------------------------------

  const tenantYearRows =
    tenants
      .map((tenant) => {
        let activeMonths = 0;

        for (
          let monthIndex = 0;
          monthIndex < 12;
          monthIndex++
        ) {
          const monthKey =
            getMonthKey(
              monthIndex,
            );

          if (
            isTenantActive(
              tenant,
              monthKey,
            )
          ) {
            activeMonths++;
          }
        }

        if (activeMonths === 0) {
          return null;
        }

        const paidRent =
          getPaymentTotal(
            getTenantYearRentPayments(
              tenant,
            ),
          );

        const expectedRent =
          Number(
            tenant.rent || 0,
          ) * activeMonths;

        const balance =
          expectedRent -
          paidRent;

        return {
          tenant,
          paidRent,
          balance,
        };
      })
      .filter(Boolean)
      .sort(
        (a, b) =>
          Number(a.tenant.slot) -
          Number(b.tenant.slot),
      );

  // ----------------------------------------
  // UI
  // ----------------------------------------

  return (
    <div className="year-page">
      <h1>Yearly summary</h1>

      <div className="mon">
        <button
          className="sq"
          onClick={() =>
            onYear(year - 1)
          }
        >
          ‹
        </button>

        <b>{year}</b>

        <button
          className="sq"
          onClick={() =>
            onYear(year + 1)
          }
        >
          ›
        </button>
      </div>

      <div className="grid">
        <div className="card">
          <div className="mu sm">
            Rent collected
          </div>

          <div
            className="big"
            style={{
              color: "var(--ok)",
            }}
          >
            {formatCurrency(
              totalCollectedRent,
            )}
          </div>
        </div>

        <div className="card">
          <div className="mu sm">
            Rent short
          </div>

          <div
            className="big"
            style={{
              color: "var(--er)",
            }}
          >
            {formatCurrency(
              rentShort,
            )}
          </div>
        </div>

        <div className="card">
          <div className="mu sm">
            Late fees collected
          </div>

          <div className="big">
            {formatCurrency(
              lateFeesCollected,
            )}
          </div>
        </div>

        <div className="card">
          <div className="mu sm">
            Deposits in / out
          </div>

          <div
            className="big"
            style={{
              fontSize: "16px",
            }}
          >
            {formatCurrency(
              depositsReceived,
            )}{" "}
            /{" "}
            {formatCurrency(
              depositsRefunded,
            )}
          </div>
        </div>
      </div>

      {/* MONTHLY */}
      <div className="card">
        <div className="mu sm">
          Collected / expected per month
        </div>

        {monthlyRows.map(
          (month) => (
            <div
              className="item"
              key={
                month.monthKey
              }
            >
              <div
                style={{
                  width: "34px",
                }}
                className="mu sm"
              >
                {
                  month.shortMonthLabel
                }
              </div>

              <div className="m">
                <div
                  className="bar"
                  style={{
                    margin: 0,
                  }}
                >
                  <i
                    style={{
                      width: `${month.percentage}%`,
                    }}
                  />
                </div>
              </div>

              <div
                className="sm"
                style={{
                  textAlign:
                    "right",
                  minWidth:
                    "112px",
                }}
              >
                {formatCurrency(
                  month.collectedRent,
                )}{" "}
                /{" "}
                {formatCurrency(
                  month.expectedRent,
                )}
              </div>
            </div>
          ),
        )}
      </div>

      {/* TENANTS */}
      <div className="card">
        <div className="mu sm">
          Per tenant
        </div>

        {tenantYearRows.length ===
        0 ? (
          <div className="empty">
            No data for this
            year.
          </div>
        ) : (
          tenantYearRows.map(
            ({
              tenant,
              paidRent,
              balance,
            }) => (
              <div
                className="item"
                key={
                  tenant._id ||
                  tenant.id
                }
              >
                <div className="slot">
                  {tenant.slot}
                </div>

                <div className="m">
                  <div>
                    <b>
                      {
                        tenant.name
                      }
                    </b>
                  </div>

                  <div className="mu sm">
                    Paid{" "}
                    {formatCurrency(
                      paidRent,
                    )}
                  </div>
                </div>

                {balance > 0 ? (
                  <span className="chip unp">
                    {formatCurrency(
                      balance,
                    )}{" "}
                    short
                  </span>
                ) : (
                  <span className="chip paid">
                    Clear
                  </span>
                )}
              </div>
            ),
          )
        )}
      </div>
    </div>
  );
}

export default Year;


make chnages only in this component and give that code ub chat 
    

