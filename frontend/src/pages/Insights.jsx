import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { BarChart3, Building2, CalendarDays, Download, Filter, ListFilter, UserRound } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import usePortalData from "../hooks/usePortalData";

const colors = ["#2563eb", "#0f766e", "#7c3aed", "#ea580c"];

const formatDate = (dateValue) =>
  new Date(dateValue).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const getStatusCount = (workshops, status) => workshops.filter((item) => item.status === status).length;

const downloadRows = (rows) => {
  const header = ["Sr No", "Coordinator", "Workshop Name", "Instructor", "Workshop Date", "Status"];
  const csvRows = rows.map((item, index) =>
    [
      index + 1,
      item.coordinator,
      item.title,
      item.instructor,
      formatDate(item.date),
      item.status,
    ]
      .map((value) => `"${String(value).replaceAll('"', '""')}"`)
      .join(",")
  );

  const blob = new Blob([[header.join(","), ...csvRows].join("\n")], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "workshop-statistics.csv";
  link.click();
  URL.revokeObjectURL(link.href);
};

const Insights = () => {
  const { portalData, loading, error } = usePortalData();
  const { isDark } = useTheme();
  const [filters, setFilters] = useState({
    search: "",
    status: "All",
    sortBy: "Newest",
  });

  const workshops = portalData.workshops ?? [];

  const pieData = useMemo(
    () => [
      { name: "Upcoming", value: portalData.stats.upcoming_workshops || 0 },
      { name: "Accepted", value: portalData.stats.accepted_workshops || getStatusCount(workshops, "Accepted") },
      { name: "Pending", value: portalData.stats.pending_workshops || getStatusCount(workshops, "Pending") },
      { name: "Workshop Types", value: portalData.stats.workshop_types || 0 },
    ],
    [portalData, workshops]
  );

  const filteredRows = useMemo(() => {
    const normalizedSearch = filters.search.trim().toLowerCase();
    const nextRows = workshops.filter((item) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [item.title, item.coordinator, item.instructor]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(normalizedSearch));

      const matchesStatus = filters.status === "All" || item.status === filters.status;
      return matchesSearch && matchesStatus;
    });

    nextRows.sort((left, right) => {
      const first = new Date(left.date).getTime();
      const second = new Date(right.date).getTime();
      return filters.sortBy === "Oldest" ? first - second : second - first;
    });

    return nextRows;
  }, [filters, workshops]);

  const filterInputStyle = {
    width: "100%",
    height: 48,
    padding: "0 14px",
    borderRadius: 14,
    border: "1px solid var(--panel-border)",
    background: isDark ? "rgba(15,23,42,0.72)" : "#ffffff",
    color: "var(--shell-text)",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div style={{ maxWidth: 1240, margin: "0 auto" }}>
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: "28px 24px",
          borderRadius: 30,
          background: "var(--panel-strong)",
          border: "1px solid var(--panel-border)",
          boxShadow: "var(--shadow-strong)",
        }}
      >
        <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: "var(--accent)", letterSpacing: "0.06em" }}>
          STATISTICS
        </p>
        <h1 style={{ margin: "10px 0 12px", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "var(--shell-text)" }}>
          Workshop statistics
        </h1>
        <p style={{ margin: 0, color: "var(--muted-text)", lineHeight: 1.7, maxWidth: 760 }}>
          Filter workshops, review coordinator activity, and export the visible workshop summary from one page.
        </p>
      </motion.section>

      {error ? <div style={{ marginTop: 18, color: "#be123c", fontWeight: 700 }}>{error}</div> : null}

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "320px minmax(0, 1fr)",
          gap: 20,
          marginTop: 20,
        }}
      >
        <motion.aside
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: 22,
            borderRadius: 28,
            background: "var(--panel-bg)",
            border: "1px solid var(--panel-border)",
            boxShadow: "var(--shadow-soft)",
            alignSelf: "start",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <h3 style={{ margin: 0, color: "var(--shell-text)", fontSize: "1.35rem" }}>Filters</h3>
            <button
              type="button"
              onClick={() => setFilters({ search: "", status: "All", sortBy: "Newest" })}
              style={{
                height: 40,
                padding: "0 14px",
                borderRadius: 12,
                border: "1px solid rgba(37,99,235,0.3)",
                background: "transparent",
                color: "#0ea5e9",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Clear
            </button>
          </div>

          <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
            <div>
              <label style={{ display: "block", marginBottom: 8, fontWeight: 700, color: "var(--secondary-text)" }}>
                Search workshop
              </label>
              <input
                value={filters.search}
                onChange={(e) => setFilters((current) => ({ ...current, search: e.target.value }))}
                placeholder="Coordinator or workshop name"
                style={filterInputStyle}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: 8, fontWeight: 700, color: "var(--secondary-text)" }}>
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters((current) => ({ ...current, status: e.target.value }))}
                style={filterInputStyle}
              >
                {["All", "Accepted", "Pending", "Ready", "Deleted"].map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: 8, fontWeight: 700, color: "var(--secondary-text)" }}>
                Sort by
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters((current) => ({ ...current, sortBy: e.target.value }))}
                style={filterInputStyle}
              >
                {["Newest", "Oldest"].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
            <button
              type="button"
              style={{
                flex: 1,
                minWidth: 120,
                height: 46,
                borderRadius: 14,
                border: "none",
                background: "linear-gradient(135deg, #16a34a, #22c55e)",
                color: "#fff",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                cursor: "pointer",
              }}
            >
              <Filter size={16} />
              View
            </button>
            <button
              type="button"
              onClick={() => downloadRows(filteredRows)}
              style={{
                flex: 1,
                minWidth: 120,
                height: 46,
                borderRadius: 14,
                border: "none",
                background: "linear-gradient(135deg, #0891b2, #06b6d4)",
                color: "#fff",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                cursor: "pointer",
              }}
            >
              <Download size={16} />
              Download
            </button>
          </div>
        </motion.aside>

        <div style={{ display: "grid", gap: 20 }}>
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 18,
            }}
          >
            {[
              {
                label: "Visible workshops",
                value: filteredRows.length,
                icon: ListFilter,
                accent: "var(--accent-soft)",
                color: "var(--accent)",
              },
              {
                label: "Accepted workshops",
                value: getStatusCount(filteredRows, "Accepted"),
                icon: BarChart3,
                accent: "rgba(15,118,110,0.12)",
                color: "#0f766e",
              },
              {
                label: "Pending workshops",
                value: getStatusCount(filteredRows, "Pending"),
                icon: CalendarDays,
                accent: "rgba(124,58,237,0.12)",
                color: "#7c3aed",
              },
            ].map(({ label, value, icon: Icon, accent, color }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                style={{
                  padding: 24,
                  borderRadius: 28,
                  background: "var(--panel-bg)",
                  border: "1px solid var(--panel-border)",
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <div>
                    <p style={{ margin: 0, color: "var(--muted-text)", fontWeight: 700 }}>{label}</p>
                    <h3 style={{ margin: "8px 0 0", color: "var(--shell-text)", fontSize: "2rem" }}>
                      {loading ? "--" : value}
                    </h3>
                  </div>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 18,
                      background: accent,
                      color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={20} />
                  </div>
                </div>
              </motion.div>
            ))}
          </section>

          <section
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 20,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              style={{
                padding: 24,
                borderRadius: 28,
                background: "var(--panel-bg)",
                border: "1px solid var(--panel-border)",
                boxShadow: "var(--shadow-soft)",
              }}
            >
              <h3 style={{ margin: 0, color: "var(--shell-text)", fontSize: "1.4rem" }}>State chart</h3>
              <div style={{ width: "100%", height: 320, marginTop: 18 }}>
                {loading ? (
                  <div style={{ color: "var(--muted-text)", fontWeight: 600 }}>Loading insights...</div>
                ) : (
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie data={pieData} dataKey="value" innerRadius={70} outerRadius={110} paddingAngle={4}>
                        {pieData.map((item, index) => (
                          <Cell key={item.name} fill={colors[index % colors.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          borderRadius: 14,
                          border: "1px solid var(--panel-border)",
                          background: isDark ? "rgba(15,23,42,0.96)" : "#ffffff",
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                padding: 24,
                borderRadius: 28,
                background: "var(--panel-bg)",
                border: "1px solid var(--panel-border)",
                boxShadow: "var(--shadow-soft)",
              }}
            >
              <h3 style={{ margin: 0, color: "var(--shell-text)", fontSize: "1.4rem" }}>Workshop summary</h3>
              <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
                {pieData.map((item, index) => (
                  <div
                    key={item.name}
                    style={{
                      padding: "16px 18px",
                      borderRadius: 20,
                      background: isDark ? "rgba(15,23,42,0.72)" : "var(--panel-muted)",
                      border: "1px solid var(--panel-border)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            background: colors[index % colors.length],
                            display: "inline-block",
                          }}
                        />
                        <span style={{ color: "var(--secondary-text)", fontWeight: 700 }}>{item.name}</span>
                      </div>
                      <strong style={{ color: "var(--shell-text)", fontSize: "1.2rem" }}>{item.value}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            style={{
              padding: 24,
              borderRadius: 28,
              background: "var(--panel-bg)",
              border: "1px solid var(--panel-border)",
              boxShadow: "var(--shadow-soft)",
              overflowX: "auto",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
              <h3 style={{ margin: 0, color: "var(--shell-text)", fontSize: "1.35rem" }}>Workshop records</h3>
              <div style={{ color: "var(--muted-text)", fontWeight: 700 }}>
                Showing {filteredRows.length} row{filteredRows.length === 1 ? "" : "s"}
              </div>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--panel-border)" }}>
                  {["Sr No.", "Coordinator Name", "Institute Name", "Instructor Name", "Workshop Name", "Workshop Date"].map((heading) => (
                    <th
                      key={heading}
                      style={{
                        textAlign: "left",
                        padding: "14px 12px",
                        color: "var(--shell-text)",
                        fontSize: 15,
                      }}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} style={{ padding: "18px 12px", color: "var(--muted-text)", fontWeight: 600 }}>
                      Loading workshop table...
                    </td>
                  </tr>
                ) : filteredRows.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: "18px 12px", color: "var(--muted-text)", fontWeight: 600 }}>
                      No workshops match the selected filters.
                    </td>
                  </tr>
                ) : (
                  filteredRows.map((item, index) => (
                    <tr key={`${item.id}-${item.date}`} style={{ borderBottom: "1px solid var(--panel-border)" }}>
                      <td style={{ padding: "16px 12px" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            width: 36,
                            height: 36,
                            borderRadius: 12,
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                            fontWeight: 800,
                          }}
                        >
                          {index + 1}
                        </span>
                      </td>
                      <td style={{ padding: "16px 12px", color: "var(--shell-text)", fontWeight: 700 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <UserRound size={16} />
                          {item.coordinator}
                        </div>
                      </td>
                      <td style={{ padding: "16px 12px", color: "var(--muted-text)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <Building2 size={16} />
                          {item.institute_name || "FOSSEE / IIT Bombay"}
                        </div>
                      </td>
                      <td style={{ padding: "16px 12px", color: "var(--shell-text)" }}>{item.instructor}</td>
                      <td style={{ padding: "16px 12px", color: "var(--shell-text)", fontWeight: 700 }}>{item.title}</td>
                      <td style={{ padding: "16px 12px", color: "var(--muted-text)" }}>{formatDate(item.date)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </motion.section>
        </div>
      </section>
    </div>
  );
};

export default Insights;
