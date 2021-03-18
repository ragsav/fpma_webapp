export function companyWiseStatus(transactions) {
  transactions.sort(function (a, b) {
    return a.date.seconds - b.date.seconds;
  });
  var report_map = {};
  transactions.forEach((transaction, i) => {
    var { symbol, date, buy, shares, pricePerShare } = transaction;
    var symbol_value = report_map[symbol];
    if (!symbol_value) {
      var local_symbol_value = 0;
    } else {
      var local_symbol_value = symbol_value;
    }

    var transaction_value = shares * pricePerShare;
    if (buy) {
      local_symbol_value = local_symbol_value - transaction_value;
    } else {
      local_symbol_value = local_symbol_value + transaction_value;
    }
    report_map[symbol] = local_symbol_value;
  });

  console.log(report_map);
}
export function dateWiseStatus(transactions) {
  transactions.sort(function (a, b) {
    return a.date.seconds - b.date.seconds;
  });
  var report_map = {};
  transactions.forEach((transaction, i) => {
    var { symbol, date, buy, shares, pricePerShare } = transaction;
    var symbol_value = report_map[symbol];
    if (!symbol_value) {
      var local_symbol_value = 0;
    } else {
      var local_symbol_value = symbol_value;
    }

    var transaction_value = shares * pricePerShare;
    if (buy) {
      local_symbol_value = local_symbol_value - transaction_value;
    } else {
      local_symbol_value = local_symbol_value + transaction_value;
    }
    report_map[symbol] = local_symbol_value;
  });

  console.log(report_map);
}

export function extractCompanyWiseReturn(transactions) {
  if (transactions === null || transactions === undefined) return;
  var companies = {};
  var company_returns = {};
  transactions.sort(function (a, b) {
    return a.date.seconds - b.date.seconds;
  });

  transactions.forEach((transaction, i) => {
    const { symbol, date, buy, shares, pricePerShare } = transaction;
    if (companies[symbol]) {
      companies[symbol].push({
        date,
        buy,
        shares: parseInt(shares),
        pricePerShare: parseInt(pricePerShare),
      });
    } else {
      companies[symbol] = [
        {
          date,
          buy,
          shares: parseInt(shares),
          pricePerShare: parseInt(pricePerShare),
        },
      ];
    }
  });

  var complete_data = {
    symbols: [],
    investments: [],
    returns: [],
    balance_stocks: [],
  };
  for (const [symbol, transactions] of Object.entries(companies)) {
    var total_investment = 0;
    var total_returns = 0;
    var total_stock_units = 0;

    transactions.forEach((transaction, i) => {
      const { date, buy, shares, pricePerShare } = transaction;
      var cost = shares * pricePerShare;
      if (buy) {
        total_stock_units = total_stock_units + shares;
        total_investment = total_investment + cost;
      } else {
        total_stock_units = total_stock_units - shares;
        total_returns = total_returns + cost;
      }
    });

    // var return_on_selling_now = 0;
    // if (total_stock_units != 0) {
    //   var symbol_ts_data = await alpha.data.quote(symbol);
    //   console.log(symbol_ts_data);
    //   var current_share_price;
    // }
    complete_data.symbols.push(symbol);
    complete_data.investments.push(total_investment);
    complete_data.returns.push(total_returns);
    complete_data.balance_stocks.push(total_stock_units);

    company_returns[symbol] = {
      total_stock_units,
      total_investment,
      total_returns,
    };
  }
  console.log(complete_data);

  return complete_data;
}
