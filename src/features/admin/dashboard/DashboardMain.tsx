function DashboardMain() {
  return (
    <div className=" p-8 bg-gray-100 text-gray-800">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">E-Office Help Desk</h1>
        <p className="mt-2 text-gray-600">
          Support and resources for your digital workplace
        </p>
      </div>

      {/* Welcome Message */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-2">Welcome!</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          This portal is designed to assist all employees with their e-office
          technical and access issues. Whether it's login problems, software
          installation requests, or general system guidance — our help desk is
          here to support you.
        </p>
      </div>
    </div>
  );
}

export default DashboardMain;
