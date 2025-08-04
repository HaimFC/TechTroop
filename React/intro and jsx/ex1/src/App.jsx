function App() {
  const showCompany = (name, revenue) => {
    return (
      <div id={name}>
        {name} makes {revenue} every year
      </div>
    );
  };

  let companies = [
    { name: "Tesla", revenue: 140 },
    { name: "Microsoft", revenue: 300 },
    { name: "Google", revenue: 600 }
  ];

  return (
    <div className="ex-space">
      <div>
        {companies.map(company => showCompany(company.name, company.revenue))}
      </div>
    </div>
  );
}

export default App;