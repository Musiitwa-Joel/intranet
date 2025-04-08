import EmailLayout from "../layout/EmailLayout";
import Header from "../common/Header";
import Divider from "../common/Divider";
import InfoBox from "../common/InfoBox";

const SystemMaintenance = ({
  recipientName = "John Doe",
  maintenanceDate = "April 15, 2025",
  startTime = "10:00 PM",
  endTime = "2:00 AM",
  affectedSystems = "Student Portal, Library System, Email Services",
  contactEmail = "itsupport@nkumbauniversity.ac.ug",
  contactPhone = "+256 414 123463",
}) => {
  return (
    <EmailLayout>
      <Header title="Scheduled System Maintenance" backgroundColor="#5C6BC0" />

      <div className="space-y-4">
        <p className="text-gray-700">
          Dear <span className="font-semibold">{recipientName}</span>,
        </p>

        <p className="text-gray-700">
          We are writing to inform you about scheduled maintenance on our
          university systems. During this time, some services will be
          temporarily unavailable.
        </p>

        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-5 my-6">
          <h3 className="text-indigo-800 font-bold text-lg mb-4">
            Maintenance Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-3 rounded border border-indigo-100">
              <div className="text-indigo-600 mb-1 font-medium">Date:</div>
              <div className="font-bold text-gray-800">{maintenanceDate}</div>
            </div>

            <div className="bg-white p-3 rounded border border-indigo-100">
              <div className="text-indigo-600 mb-1 font-medium">Time:</div>
              <div className="font-bold text-gray-800">
                {startTime} - {endTime} (East Africa Time)
              </div>
            </div>

            <div className="bg-white p-3 rounded border border-indigo-100 md:col-span-2">
              <div className="text-indigo-600 mb-1 font-medium">
                Affected Systems:
              </div>
              <div className="font-bold text-gray-800">{affectedSystems}</div>
            </div>
          </div>
        </div>

        <InfoBox
          title="Why This Maintenance Is Necessary"
          borderColor="#5C6BC0"
          bgColor="#E8EAF6"
        >
          <p>
            This scheduled maintenance is part of our ongoing efforts to improve
            system performance, enhance security, and implement new features.
            The updates will help ensure that our digital services continue to
            meet the needs of our university community.
          </p>
        </InfoBox>

        <Divider />

        <p className="text-gray-700 font-semibold">
          During the maintenance period:
        </p>

        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>You will not be able to access the affected systems</li>
          <li>
            Any work in progress should be saved before the maintenance begins
          </li>
          <li>Automated services like scheduled reports may be delayed</li>
          <li>Email delivery may be delayed but not lost</li>
        </ul>

        <p className="text-gray-700 mt-4">
          We recommend completing any urgent tasks before the maintenance period
          begins. All services should be fully restored by {endTime} on{" "}
          {maintenanceDate}.
        </p>

        <p className="text-gray-700 mt-4">
          If you experience any issues after the maintenance is complete, please
          contact our IT support team:
        </p>

        <div className="bg-gray-50 p-4 rounded-md text-gray-600 text-sm">
          <p>
            <strong>Email:</strong> {contactEmail}
          </p>
          <p>
            <strong>Phone:</strong> {contactPhone}
          </p>
          <p>
            <strong>Hours:</strong> Monday to Friday, 8:00 AM to 5:00 PM
          </p>
        </div>

        <p className="text-gray-700 mt-4">
          We apologize for any inconvenience this may cause and appreciate your
          understanding.
        </p>

        <p className="text-gray-700">
          Regards,
          <br />
          <span className="font-semibold">IT Department</span>
          <br />
          Nkumba University
        </p>
      </div>
    </EmailLayout>
  );
};

export default SystemMaintenance;
