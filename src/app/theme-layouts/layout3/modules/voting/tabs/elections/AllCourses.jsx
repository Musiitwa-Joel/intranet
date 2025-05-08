import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Tree, Input, Spin, Select, Row, Col } from "antd";
import "./myStyles.css";
import { useDispatch } from "react-redux";
import {
  setSelectedStdInfoItem,
  setStdInfoReqs,
} from "../../store/VotingSlice";

const { DirectoryTree } = Tree;
const { Search } = Input;

const containsSearchTerm = (str, searchTerm) =>
  str.toLowerCase().includes(searchTerm.toLowerCase());

// Main search function
function searchHierarchy(data, searchTerm) {
  function search(items) {
    return items.reduce((acc, item) => {
      let match = false;

      // Check if the current item matches
      if (
        containsSearchTerm(item.label, searchTerm) ||
        containsSearchTerm(item.code ? item.code : "", searchTerm)
      ) {
        match = true;
      }

      // Recursively search children
      const matchingChildren = item.children ? search(item.children) : [];

      // If there's a match in the current item or its children
      if (match || matchingChildren.length > 0) {
        // Create a new object with matching items, preserving the original structure
        const newItem = { ...item };

        // If there are matching children, add them to the new item
        if (matchingChildren.length > 0) {
          newItem.children = matchingChildren;
        }

        // Add the matching item to the accumulator
        acc.push(newItem);
      }

      return acc;
    }, []);
  }

  return search(data);
}

const DirectoryOpenIcon = React.memo(() => (
  <svg
    aria-hidden="true"
    focusable="false"
    className="octicon octicon-file-directory-open-fill"
    viewBox="0 0 16 16"
    width={16}
    height={16}
    fill="#54aeff"
    style={{
      display: "inline-block",
      userSelect: "none",
      verticalAlign: "text-bottom",
      overflow: "visible",
    }}
  >
    <path d="M.513 1.513A1.75 1.75 0 0 1 1.75 1h3.5c.55 0 1.07.26 1.4.7l.9 1.2a.25.25 0 0 0 .2.1H13a1 1 0 0 1 1 1v.5H2.75a.75.75 0 0 0 0 1.5h11.978a1 1 0 0 1 .994 1.117L15 13.25A1.75 1.75 0 0 1 13.25 15H1.75A1.75 0 0 1 0 13.25V2.75c0-.464.184-.91.513-1.237Z" />
  </svg>
));

const DirectoryClosedIcon = React.memo(() => (
  <svg
    aria-hidden="true"
    focusable="false"
    className="octicon octicon-file-directory-fill"
    viewBox="0 0 16 16"
    width={16}
    height={16}
    fill="#54aeff"
    style={{
      display: "inline-block",
      userSelect: "none",
      verticalAlign: "text-bottom",
      overflow: "visible",
    }}
  >
    <path d="M1.75 1A1.75 1.75 0 0 0 0 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0 0 16 13.25v-8.5A1.75 1.75 0 0 0 14.25 3H7.5a.25.25 0 0 1-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75Z" />
  </svg>
));

const FileIcon = React.memo(() => (
  <svg
    aria-hidden="true"
    focusable="false"
    role="img"
    className="octicon octicon-file"
    viewBox="0 0 16 16"
    width={16}
    height={16}
    fill="#636c76"
    style={{
      display: "inline-block",
      userSelect: "none",
      verticalAlign: "text-bottom",
      overflow: "visible",
    }}
  >
    <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z" />
  </svg>
));

const titleRender = (nodeData, panelWidth) => {
  return (
    <div
      style={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: `${panelWidth - 7.954}vw`,
      }}
    >
      <span
        style={{
          fontWeight: "500",
        }}
      >
        {nodeData.title}
      </span>
    </div>
  );
};

// Elections data structure
const electionsData = [
  {
    id: "guild-elections",
    label: "GUILD ELECTIONS",
    code: "",
    __typename: "ElectionCategory",
    children: [
      {
        id: "ge001",
        label: "PRESIDENTIAL",
        code: "GE001",
        __typename: "Election",
      },
    ],
  },
  {
    id: "faculty-elections",
    label: "FACULTY ELECTIONS",
    code: "",
    __typename: "ElectionCategory",
    children: [
      {
        id: "fe001",
        label: "FACULTY REP - SCHOOL OF BUSINESS ADMINISTRATION",
        code: "FE001",
        __typename: "Election",
      },
      {
        id: "fe002",
        label: "FACULTY REP - SCHOOL OF LAW",
        code: "FE002",
        __typename: "Election",
      },
      {
        id: "fe003",
        label: "FACULTY REP - SCHOOL OF COMPUTING AND INFORMATICS",
        code: "FE003",
        __typename: "Election",
      },
      {
        id: "fe004",
        label: "FACULTY REP - SCHOOL OF INDUSTRIAL ART AND DESIGN",
        code: "FE004",
        __typename: "Election",
      },
      {
        id: "fe006",
        label: "FACULTY REP - SCHOOL OF SCIENCES",
        code: "FE006",
        __typename: "Election",
      },
      {
        id: "fe007",
        label: "FACULTY REP - SCHOOL OF SOCIAL SCIENCES",
        code: "FE007",
        __typename: "Election",
      },
      {
        id: "fe008",
        label: "FACULTY REP - SCHOOL OF POST GRADUATE STUDIES",
        code: "FE008",
        __typename: "Election",
      },
      {
        id: "fe009",
        label: "FACULTY REP - SCHOOL OF EDUCATION",
        code: "FE009",
        __typename: "Election",
      },
    ],
  },
  {
    id: "law_school-elections",
    label: "LAW SCHOOL ELECTIONS",
    code: "",
    __typename: "ElectionCategory",
    children: [
      {
        id: "cr001",
        label: "LAW SOCIETY PRESIDENT",
        code: "CR001",
        __typename: "Election",
      },
    ],
  },
];

// Dummy data for select components
const dummyCampuses = [
  { id: "1", campus_title: "MAIN" },
  { id: "2", campus_title: "KAMPALA" },
  { id: "3", campus_title: "KYEGEGWA" },
];

const dummyIntakes = [
  { id: "1", intake_title: "FEBRUARY" },
  { id: "2", intake_title: "AUGUST" },
];

const dummyAccYrs = [
  { id: "1", acc_yr_title: "2024/2025" },
  { id: "2", acc_yr_title: "2025/2026" },
  { id: "3", acc_yr_title: "2026/2027" },
];

const ElectionsTree = ({ panelWidth = 50 }) => {
  const [dynamicHeight, setDynamicHeight] = useState(window.innerHeight - 290);
  const [expandedKeys, setExpandedKeys] = useState([
    "guild-elections",
    "faculty-elections",
    "class-rep-elections",
  ]);
  const [searchValue, setSearchValue] = useState("");
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [filteredElections, setFilteredElections] = useState(electionsData);
  const [selectedCampus, setSelectedCampus] = useState("1");
  const [selectedIntake, setSelectedIntake] = useState("1");
  const [selectedAccYr, setSelectedAccYr] = useState("1");
  const dispatch = useDispatch();
  const hasExpandedItemsDispatched = useRef(false);

  const transformData = useCallback((nodes) => {
    return nodes.map((node) => ({
      key: node.id,
      title: node.code ? `${node.code} - ${node.label}` : node.label,
      isLeaf: node.__typename === "Election",
      children: node.children ? transformData(node.children) : [],
      typename: node.__typename,
      item: node,
      level: node.children ? 1 : 2,
    }));
  }, []);

  const updateHeight = () => {
    const newHeight = window.innerHeight - 290;
    setDynamicHeight(newHeight);
  };

  useEffect(() => {
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  useEffect(() => {
    const searchResult = searchHierarchy(electionsData, searchValue);
    setFilteredElections(searchResult);
  }, [searchValue]);

  useEffect(() => {
    // Initialize Redux state with dummy data
    if (!hasExpandedItemsDispatched.current) {
      dispatch(
        setStdInfoReqs({
          campus: "1",
          intake: "1",
          acc_yr: "1",
        })
      );
      hasExpandedItemsDispatched.current = true;
    }
  }, [dispatch]);

  const onSelect = (keys, info) => {
    if (info.selectedNodes[0].typename === "Election") {
      const electionItem = info.selectedNodes[0].item;
      // Create the exact structure expected by StudentDetails
      const enhancedItem = {
        ...electionItem,
        course: {
          course_code: electionItem.code,
          course_title: electionItem.label,
        },
      };
      dispatch(setSelectedStdInfoItem(enhancedItem));
      console.log("Selected election:", enhancedItem);
    }
  };

  const onExpand = (newExpandedKeys) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    const searchResult = searchHierarchy(electionsData, value);
    setFilteredElections(searchResult);
  };

  // Memoized transformed tree data
  const memoizedTreeData = useMemo(
    () => transformData(filteredElections || []),
    [filteredElections, transformData]
  );

  return (
    <div
      style={{
        padding: 10,
        backgroundColor: "#fff",
        borderTopColor: "lightgray",
        borderTopWidth: 1,
      }}
    >
      <Spin
        tip="Loading Elections..."
        spinning={false}
        style={{
          height: "calc(100vh)",
        }}
      >
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <div
              style={{
                paddingBottom: 8,
              }}
            >
              <Select
                size="default"
                placeholder="Campus"
                value={selectedCampus}
                onChange={(value) => {
                  setSelectedCampus(value);
                  dispatch(
                    setStdInfoReqs({
                      campus: value,
                    })
                  );
                }}
                style={{
                  width: "100%",
                }}
                options={dummyCampuses.map((campus) => ({
                  value: campus.id,
                  label: `${campus.campus_title} CAMPUS`,
                }))}
              />
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div
              style={{
                paddingBottom: 8,
              }}
            >
              <Select
                placeholder="Intake"
                size="default"
                value={selectedIntake}
                onChange={(value) => {
                  setSelectedIntake(value);
                  dispatch(
                    setStdInfoReqs({
                      intake: value,
                    })
                  );
                }}
                style={{
                  width: "100%",
                }}
                options={dummyIntakes.map((intake) => ({
                  value: intake.id,
                  label: `${intake.intake_title} INTAKE`,
                }))}
              />
            </div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" span={24}>
            <div
              style={{
                paddingBottom: 8,
              }}
            >
              <Select
                size="default"
                placeholder="Academic Year"
                value={selectedAccYr}
                onChange={(value) => {
                  setSelectedAccYr(value);
                  dispatch(
                    setStdInfoReqs({
                      acc_yr: value,
                    })
                  );
                }}
                style={{
                  width: "100%",
                }}
                options={dummyAccYrs.map((acc) => ({
                  value: acc.id,
                  label: `${acc.acc_yr_title}`,
                }))}
              />
            </div>
          </Col>
        </Row>
        <Search
          style={{ marginBottom: 8 }}
          placeholder="Search"
          onChange={onSearchChange}
        />
        <div>
          <DirectoryTree
            showLine={true}
            height={dynamicHeight}
            onSelect={onSelect}
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            treeData={memoizedTreeData}
            showIcon={true}
            icon={(item) =>
              item.data.typename === "Election" ? (
                <FileIcon />
              ) : item.expanded ? (
                <DirectoryOpenIcon />
              ) : (
                <DirectoryClosedIcon />
              )
            }
            titleRender={(item) => titleRender(item, panelWidth)}
          />
        </div>
      </Spin>
    </div>
  );
};

export default ElectionsTree;
