import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { 
  BellIcon, 
  SearchIcon, 
  CrownIcon, 
  ShieldIcon, 
  UsersIcon, 
  SettingsIcon, 
  BarChart3Icon, 
  DatabaseIcon, 
  ServerIcon, 
  CreditCardIcon, 
  BuildingIcon, 
  FileTextIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  ClockIcon, 
  AlertTriangleIcon, 
  TrendingUpIcon, 
  TrendingDownIcon, 
  DollarSignIcon, 
  MapPinIcon, 
  GlobeIcon, 
  KeyIcon, 
  CodeIcon, 
  ShoppingCartIcon, 
  HardDriveIcon, 
  ActivityIcon, 
  UserIcon, 
  WalletIcon, 
  HandshakeIcon, 
  SearchCheckIcon, 
  PieChartIcon, 
  MessageSquareIcon, 
  MailIcon, 
  TicketIcon, 
  PaletteIcon, 
  GiftIcon, 
  StarIcon, 
  FolderIcon, 
  LockIcon, 
  MonitorIcon, 
  WifiOffIcon, 
  PlusIcon, 
  EditIcon, 
  TrashIcon, 
  EyeIcon, 
  DownloadIcon, 
  UploadIcon, 
  RefreshCwIcon, 
  FilterIcon, 
  MoreHorizontalIcon, 
  ChevronDownIcon, 
  HomeIcon, 
  HeadphonesIcon, 
  PhoneIcon, 
  CalendarIcon, 
  LinkIcon, 
  ZapIcon, 
  ShieldCheckIcon, 
  AlertCircleIcon, 
  InfoIcon, 
  CheckIcon, 
  XIcon, 
  PlayIcon, 
  RotateCcwIcon, 
  SaveIcon, 
  SendIcon, 
  CopyIcon, 
  ShareIcon, 
  PrinterIcon, 
  ExternalLinkIcon, 
  ArrowRightIcon 
} from "lucide-react";

export const SuperAdminDashboard = (): JSX.Element => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: "", message: "" });
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [showAddTerminalModal, setShowAddTerminalModal] = useState(false);
  const [showAssignTerminalModal, setShowAssignTerminalModal] = useState(false);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedTerminal, setSelectedTerminal] = useState<any>(null);
  const [posNotifications, setPosNotifications] = useState([
    { id: "POS_REQ_001", type: "request", message: "New POS terminal request from Tech Solutions Ltd", timestamp: "2 hours ago", isRead: false },
    { id: "POS_ACT_001", type: "activation", message: "POS terminal TRM12348 activated successfully", timestamp: "4 hours ago", isRead: false },
    { id: "POS_REQ_002", type: "request", message: "POS terminal request from Retail Masters Inc", timestamp: "1 day ago", isRead: true }
  ]);
  const [terminalFormData, setTerminalFormData] = useState({
    terminalId: "",
    merchantName: "",
    location: "",
    region: "",
    serialNumber: "",
    model: "",
    dailyLimit: "",
    monthlyLimit: ""
  });
  const [userFormData, setUserFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    userType: "Individual",
    region: "",
    status: "Active"
  });

  // Confetti animation function
  const triggerConfetti = () => {
    if (hasTriggeredConfetti) return;
    
    setHasTriggeredConfetti(true);
    
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      zIndex: 9999
    });
  };

  const showSuccess = (title: string, message: string) => {
    setSuccessMessage({ title, message });
    setShowSuccessModal(true);
    setHasTriggeredConfetti(false);
    
    setTimeout(() => {
      triggerConfetti();
    }, 300);

    setTimeout(() => {
      setShowSuccessModal(false);
      setHasTriggeredConfetti(false);
    }, 4000);
  };

  // Navigation items for Super Admin
  const superAdminNavItems = [
    { id: "dashboard", name: "Dashboard", icon: <HomeIcon className="w-5 h-5" />, description: "Platform Overview" },
    { id: "users", name: "User Management", icon: <UsersIcon className="w-5 h-5" />, description: "All Users" },
    { id: "pos", name: "POS Management", icon: <BuildingIcon className="w-5 h-5" />, description: "Terminal Control" },
    { id: "transactions", name: "Transactions", icon: <CreditCardIcon className="w-5 h-5" />, description: "Transaction Control" },
    { id: "cards", name: "Card Management", icon: <CreditCardIcon className="w-5 h-5" />, description: "Card Operations" },
    { id: "kyc", name: "KYC Management", icon: <FileTextIcon className="w-5 h-5" />, description: "Identity Verification" },
    { id: "kyb", name: "KYB Management", icon: <BuildingIcon className="w-5 h-5" />, description: "Business Verification" },
    { id: "regional", name: "Regional Management", icon: <GlobeIcon className="w-5 h-5" />, description: "Multi-Region Control" },
    { id: "api", name: "API Management", icon: <CodeIcon className="w-5 h-5" />, description: "API Control" },
    { id: "system-health", name: "System Health", icon: <ActivityIcon className="w-5 h-5" />, description: "Analytics" },
    { id: "security", name: "Security Center", icon: <LockIcon className="w-5 h-5" />, description: "Security Management" }
  ];

  // Sample data
  const platformStats = {
    totalUsers: 2500000,
    totalTransactions: 45600000,
    totalRevenue: 125000000000,
    uptime: 99.97,
    activeRegions: 10,
    totalAdmins: 247
  };

  const users = [
    { id: "1", firstName: "Carchy", middleName: "Chijioke", lastName: "Atinse", email: "carchy@email.com", phone: "+234 801 234 5678", type: "Individual", kycStatus: "Tier 2", region: "Nigeria", status: "Active", balance: 120000 },
    { id: "2", firstName: "Tech", middleName: "", lastName: "Solutions Ltd", email: "admin@techsolutions.com", phone: "+233 201 234 5678", type: "Business", kybStatus: "Tier 3", region: "Ghana", status: "Active", balance: 2500000 },
    { id: "3", firstName: "Alex", middleName: "James", lastName: "Developer", email: "alex@dev.com", phone: "+254 701 234 567", type: "Developer", kycStatus: "Tier 1", region: "Kenya", status: "Active", balance: 50000 },
    { id: "4", firstName: "John", middleName: "Michael", lastName: "Admin", email: "john@surebanker.com", phone: "+234 802 345 6789", type: "Admin", kycStatus: "Verified", region: "Nigeria", status: "Active", balance: 0 },
    { id: "5", firstName: "Sarah", middleName: "Jane", lastName: "Support", email: "sarah@surebanker.com", phone: "+233 202 345 678", type: "Support", kycStatus: "Verified", region: "Ghana", status: "Active", balance: 0 },
    { id: "6", firstName: "Mike", middleName: "", lastName: "SuperAdmin", email: "mike@surebanker.com", phone: "+254 702 345 678", type: "SuperAdmin", kycStatus: "Verified", region: "Kenya", status: "Active", balance: 0 }
  ];

  const posTerminals = [
    { id: "POS001", terminalId: "TRM12345", merchantName: "Main Store", location: "Lagos, Nigeria", status: "Active", dailyVolume: 450000, transactionCount: 156, uptime: "99.8%", assignedUser: "Tech Solutions Ltd", serialNumber: "SN001234", model: "POS-X1" },
    { id: "POS002", terminalId: "TRM12346", merchantName: "Satellite Office", location: "Accra, Ghana", status: "Offline", dailyVolume: 0, transactionCount: 0, uptime: "0%", assignedUser: "Retail Masters Inc", serialNumber: "SN001235", model: "POS-X2" },
    { id: "POS003", terminalId: "TRM12347", merchantName: "Branch Store", location: "Nairobi, Kenya", status: "Maintenance", dailyVolume: 125000, transactionCount: 45, uptime: "95.2%", assignedUser: "Green Energy Corp", serialNumber: "SN001236", model: "POS-X1" },
    { id: "POS004", terminalId: "TRM12348", merchantName: "Unassigned Terminal", location: "Lagos, Nigeria", status: "Inactive", dailyVolume: 0, transactionCount: 0, uptime: "0%", assignedUser: null, serialNumber: "SN001237", model: "POS-X3" },
    { id: "POS005", terminalId: "TRM12349", merchantName: "Unassigned Terminal", location: "Accra, Ghana", status: "Inactive", dailyVolume: 0, transactionCount: 0, uptime: "0%", assignedUser: null, serialNumber: "SN001238", model: "POS-X2" }
  ];

  const transactions = [
    { id: "TXN001", amount: 50000, type: "Transfer", status: "Completed", user: "Carchy Atinse", region: "Nigeria", date: "2024-01-15", time: "14:30" },
    { id: "TXN002", amount: 125000, type: "Payment", status: "Pending", user: "Tech Solutions", region: "Ghana", date: "2024-01-15", time: "12:15" },
    { id: "TXN003", amount: 25000, type: "Withdrawal", status: "Failed", user: "Alex Developer", region: "Kenya", date: "2024-01-15", time: "09:45" }
  ];

  const cards = [
    { id: "CARD001", cardNumber: "4532 **** **** 9012", holderName: "Carchy Atinse", type: "Visa", status: "Active", spendingLimit: 100000, monthlySpent: 25000, region: "Nigeria" },
    { id: "CARD002", cardNumber: "5234 **** **** 3456", holderName: "John Doe", type: "Mastercard", status: "Blocked", spendingLimit: 50000, monthlySpent: 0, region: "Ghana" },
    { id: "CARD003", cardNumber: "5061 **** **** 0123", holderName: "Jane Smith", type: "Verve", status: "Expired", spendingLimit: 25000, monthlySpent: 0, region: "Kenya" }
  ];

  const kycCases = [
    { id: "KYC001", userName: "John Doe", currentTier: "Tier 1", requestedTier: "Tier 2", documents: 3, status: "Under Review", submittedDate: "2024-01-10", region: "Nigeria" },
    { id: "KYC002", userName: "Jane Smith", currentTier: "Tier 2", requestedTier: "Tier 3", documents: 5, status: "Approved", submittedDate: "2024-01-08", region: "Ghana" },
    { id: "KYC003", userName: "Mike Johnson", currentTier: "Tier 0", requestedTier: "Tier 1", documents: 2, status: "Rejected", submittedDate: "2024-01-12", region: "Kenya" }
  ];

  const kybCases = [
    { id: "KYB001", businessName: "Tech Solutions Ltd", currentTier: "Tier 1", requestedTier: "Tier 2", documents: 8, status: "Under Review", submittedDate: "2024-01-09", region: "Nigeria" },
    { id: "KYB002", businessName: "Green Energy Corp", currentTier: "Tier 2", requestedTier: "Tier 3", documents: 12, status: "Approved", submittedDate: "2024-01-07", region: "Ghana" },
    { id: "KYB003", businessName: "Retail Masters Inc", currentTier: "Tier 0", requestedTier: "Tier 1", documents: 5, status: "Pending Documents", submittedDate: "2024-01-11", region: "Kenya" }
  ];

  const regions = [
    { id: "1", name: "Nigeria", code: "NG", users: 1200000, admins: 45, status: "Active", database: "ng-prod-db", lastUpdate: "2 hours ago" },
    { id: "2", name: "Ghana", code: "GH", users: 450000, admins: 12, status: "Active", database: "gh-prod-db", lastUpdate: "1 day ago" },
    { id: "3", name: "Kenya", code: "KE", users: 380000, admins: 8, status: "Active", database: "ke-prod-db", lastUpdate: "3 hours ago" },
    { id: "4", name: "South Africa", code: "ZA", users: 320000, admins: 15, status: "Active", database: "za-prod-db", lastUpdate: "5 hours ago" },
    { id: "5", name: "Tanzania", code: "TZ", users: 150000, admins: 6, status: "Pending", database: "tz-staging-db", lastUpdate: "1 week ago" }
  ];

  const apiEndpoints = [
    { id: "API001", endpoint: "/api/v1/users", method: "GET", calls: 125000, successRate: "99.8%", avgResponse: "145ms", status: "Healthy" },
    { id: "API002", endpoint: "/api/v1/transactions", method: "POST", calls: 89000, successRate: "99.2%", avgResponse: "230ms", status: "Healthy" },
    { id: "API003", endpoint: "/api/v1/cards", method: "PUT", calls: 12000, successRate: "97.5%", avgResponse: "180ms", status: "Warning" }
  ];

  // Render functions for each page
  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1E293B] mb-2">Super Admin Dashboard</h1>
          <p className="text-[#64748B] text-lg">Platform overview and key metrics</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 flex items-center gap-2">
            <RefreshCwIcon className="w-4 h-4" />
            Refresh Data
          </Button>
          <Button className="h-12 px-6 bg-[#7C3AED] text-white hover:bg-[#6D28D9] flex items-center gap-2">
            <DownloadIcon className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Platform Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <UsersIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">Total Users</p>
                <p className="text-2xl font-bold text-[#1E293B]">{platformStats.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-green-600 font-medium">+12.5% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <CreditCardIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">Total Transactions</p>
                <p className="text-2xl font-bold text-[#1E293B]">{(platformStats.totalTransactions / 1000000).toFixed(1)}M</p>
                <p className="text-sm text-green-600 font-medium">+8.3% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <DollarSignIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-[#1E293B]">₦{(platformStats.totalRevenue / 1000000000).toFixed(1)}B</p>
                <p className="text-sm text-green-600 font-medium">+15.7% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <ActivityIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">System Uptime</p>
                <p className="text-2xl font-bold text-[#1E293B]">{platformStats.uptime}%</p>
                <p className="text-sm text-green-600 font-medium">99.9% SLA target</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-8">
          <h2 className="text-xl font-bold text-[#1E293B] mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "Manage Users", icon: <UsersIcon className="w-6 h-6" />, color: "bg-blue-500", action: () => setCurrentPage("users") },
              { name: "POS Terminals", icon: <BuildingIcon className="w-6 h-6" />, color: "bg-green-500", action: () => setCurrentPage("pos") },
              { name: "Transactions", icon: <CreditCardIcon className="w-6 h-6" />, color: "bg-purple-500", action: () => setCurrentPage("transactions") },
              { name: "System Health", icon: <ActivityIcon className="w-6 h-6" />, color: "bg-orange-500", action: () => setCurrentPage("system-health") },
              { name: "Regions", icon: <GlobeIcon className="w-6 h-6" />, color: "bg-indigo-500", action: () => setCurrentPage("regional") },
              { name: "Security", icon: <LockIcon className="w-6 h-6" />, color: "bg-red-500", action: () => setCurrentPage("security") }
            ].map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-24 flex flex-col items-center gap-3 border-2 hover:border-[#7C3AED] hover:bg-[#F8F9FF] transition-all"
                onClick={action.action}
              >
                <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center text-white`}>
                  {action.icon}
                </div>
                <span className="text-sm font-medium">{action.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-8">
          <h2 className="text-xl font-bold text-[#1E293B] mb-6">Recent Platform Activities</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-green-900">New admin user created</p>
                <p className="text-sm text-green-700">Sarah Regional Admin added to Ghana region</p>
              </div>
              <span className="text-sm text-green-600 font-medium">2 hours ago</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <DatabaseIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-blue-900">Database maintenance completed</p>
                <p className="text-sm text-blue-700">Kenya database optimization finished successfully</p>
              </div>
              <span className="text-sm text-blue-600 font-medium">4 hours ago</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <TrendingUpIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-purple-900">Revenue milestone reached</p>
                <p className="text-sm text-purple-700">Platform crossed ₦125B in total transaction volume</p>
              </div>
              <span className="text-sm text-purple-600 font-medium">1 day ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1E293B] mb-2">User Management</h1>
          <p className="text-[#64748B] text-lg">Manage all platform users across all regions</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 flex items-center gap-2">
            <DownloadIcon className="w-4 h-4" />
            Export Users
          </Button>
          <Button 
            className="h-12 px-6 bg-[#7C3AED] text-white hover:bg-[#6D28D9]"
            onClick={() => showSuccess("User Created", "New user account has been created successfully")}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Create User
          </Button>
        </div>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B]">Individual</p>
                <p className="text-xl font-bold text-[#1E293B]">2.1M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <BuildingIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B]">Business</p>
                <p className="text-xl font-bold text-[#1E293B]">350K</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <CodeIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B]">Developer</p>
                <p className="text-xl font-bold text-[#1E293B]">50K</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <ShieldIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B]">Admin</p>
                <p className="text-xl font-bold text-[#1E293B]">247</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <HeadphonesIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B]">Support</p>
                <p className="text-xl font-bold text-[#1E293B]">150</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
                <CrownIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B]">SuperAdmin</p>
                <p className="text-xl font-bold text-[#1E293B]">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-[#1E293B]">All Users</h2>
            <div className="flex gap-4">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80 h-12"
                />
              </div>
              <select 
                className="px-4 py-3 border border-gray-300 rounded-lg text-sm h-12 min-w-[140px]"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="individual">Individual</option>
                <option value="business">Business</option>
                <option value="developer">Developer</option>
                <option value="admin">Admin</option>
                <option value="support">Support</option>
                <option value="superadmin">SuperAdmin</option>
              </select>
              <select 
                className="px-4 py-3 border border-gray-300 rounded-lg text-sm h-12 min-w-[140px]"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="all">All Regions</option>
                <option value="nigeria">Nigeria</option>
                <option value="ghana">Ghana</option>
                <option value="kenya">Kenya</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">FIRST NAME</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">MIDDLE NAME</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">LAST NAME</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">EMAIL</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">PHONE</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">TYPE</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">STATUS</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">REGION</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-sm font-medium text-[#1E293B]">{user.firstName}</td>
                    <td className="py-4 px-6 text-sm text-[#64748B]">{user.middleName || '-'}</td>
                    <td className="py-4 px-6 text-sm font-medium text-[#1E293B]">{user.lastName}</td>
                    <td className="py-4 px-6 text-sm text-[#64748B]">{user.email}</td>
                    <td className="py-4 px-6 text-sm text-[#64748B]">{user.phone}</td>
                    <td className="py-4 px-6">
                      <Badge className={
                        user.type === "Individual" ? "bg-blue-100 text-blue-800" :
                        user.type === "Business" ? "bg-green-100 text-green-800" :
                        user.type === "Developer" ? "bg-purple-100 text-purple-800" :
                        user.type === "Admin" ? "bg-orange-100 text-orange-800" :
                        user.type === "Support" ? "bg-indigo-100 text-indigo-800" :
                        "bg-pink-100 text-pink-800"
                      }>
                        {user.type}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <Badge className={
                        user.status === "Active" ? "bg-green-100 text-green-800" :
                        user.status === "Frozen" ? "bg-blue-100 text-blue-800" :
                        "bg-red-100 text-red-800"
                      }>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-sm text-[#64748B]">{user.region}</td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setShowUserDetailsModal(true);
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("User Frozen", `${user.firstName} ${user.lastName}'s account has been frozen`)}
                          className="h-8 w-8 p-0"
                        >
                          <XCircleIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("User Activated", `${user.firstName} ${user.lastName}'s account has been activated`)}
                          className="h-8 w-8 p-0"
                        >
                          <CheckCircleIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPOS = () => (
    <div className="space-y-8">
      {/* POS Notifications */}
      {posNotifications.filter(n => !n.isRead).length > 0 && (
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <BellIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-900">POS Terminal Notifications</h3>
                <p className="text-sm text-blue-700">New terminal requests and activations</p>
              </div>
              <Badge className="bg-blue-500 text-white px-3 py-1">
                {posNotifications.filter(n => !n.isRead).length} new
              </Badge>
            </div>
            <div className="space-y-3">
              {posNotifications.filter(n => !n.isRead).slice(0, 3).map((notification) => (
                <div key={notification.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      notification.type === 'request' ? 'bg-orange-100' : 'bg-green-100'
                    }`}>
                      {notification.type === 'request' ? 
                        <ClockIcon className="w-5 h-5 text-orange-600" /> : 
                        <CheckCircleIcon className="w-5 h-5 text-green-600" />
                      }
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1E293B]">{notification.message}</p>
                      <p className="text-xs text-[#64748B]">{notification.timestamp}</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      setPosNotifications(prev => 
                        prev.map(n => n.id === notification.id ? {...n, isRead: true} : n)
                      );
                    }}
                    className="h-8 px-3"
                  >
                    Mark Read
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1E293B] mb-2">POS Management</h1>
          <p className="text-[#64748B] text-lg">Monitor and manage all POS terminals across regions</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 flex items-center gap-2">
            <DownloadIcon className="w-4 h-4" />
            Export POS Data
          </Button>
          <Button 
            className="h-12 px-6 bg-[#7C3AED] text-white hover:bg-[#6D28D9]"
            onClick={() => setShowAddTerminalModal(true)}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Terminal
          </Button>
        </div>
      </div>

      {/* POS Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <BuildingIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">Total Terminals</p>
                <p className="text-2xl font-bold text-[#1E293B]">{posTerminals.length}</p>
                <p className="text-sm text-blue-600 font-medium">All regions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <CheckCircleIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">Active Terminals</p>
                <p className="text-2xl font-bold text-[#1E293B]">{posTerminals.filter(t => t.status === 'Active').length}</p>
                <p className="text-sm text-green-600 font-medium">Online & working</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <DollarSignIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">Daily Volume</p>
                <p className="text-2xl font-bold text-[#1E293B]">₦{(posTerminals.reduce((sum, t) => sum + t.dailyVolume, 0) / 1000000).toFixed(1)}M</p>
                <p className="text-sm text-orange-600 font-medium">Today's transactions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <CreditCardIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">Daily Transactions</p>
                <p className="text-2xl font-bold text-[#1E293B]">{posTerminals.reduce((sum, t) => sum + t.transactionCount, 0)}</p>
                <p className="text-sm text-purple-600 font-medium">Processed today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* POS Terminals Table */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-[#1E293B]">POS Terminals</h2>
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                className="h-12 px-6 flex items-center gap-2"
                onClick={() => setShowAssignTerminalModal(true)}
              >
                <UserIcon className="w-4 h-4" />
                Assign Terminal
              </Button>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <Input
                  placeholder="Search terminals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80 h-12"
                />
              </div>
              <select 
                className="px-4 py-3 border border-gray-300 rounded-lg text-sm h-12 min-w-[140px]"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="offline">Offline</option>
                <option value="maintenance">Maintenance</option>
                <option value="inactive">Inactive</option>
                <option value="frozen">Frozen</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">TERMINAL ID</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">MERCHANT</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">ASSIGNED USER</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">LOCATION</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">STATUS</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">DAILY VOLUME</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">UPTIME</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {posTerminals.map((terminal) => (
                  <tr key={terminal.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-sm font-medium text-[#1E293B]">{terminal.terminalId}</td>
                    <td className="py-4 px-6 text-sm text-[#64748B]">{terminal.merchantName}</td>
                    <td className="py-4 px-6">
                      {terminal.assignedUser ? (
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckIcon className="w-3 h-3 text-green-600" />
                          </div>
                          <span className="text-sm text-[#1E293B]">{terminal.assignedUser}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <XIcon className="w-3 h-3 text-gray-600" />
                          </div>
                          <span className="text-sm text-gray-500">Unassigned</span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-[#64748B]">{terminal.location}</td>
                    <td className="py-4 px-6">
                      <Badge className={
                        terminal.status === "Active" ? "bg-green-100 text-green-800" :
                        terminal.status === "Offline" ? "bg-red-100 text-red-800" :
                        terminal.status === "Frozen" ? "bg-blue-100 text-blue-800" :
                        terminal.status === "Inactive" ? "bg-gray-100 text-gray-800" :
                        "bg-yellow-100 text-yellow-800"
                      }>
                        {terminal.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-[#1E293B]">₦{terminal.dailyVolume.toLocaleString()}</td>
                    <td className="py-4 px-6 text-sm text-[#64748B]">{terminal.uptime}</td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Terminal Frozen", `Terminal ${terminal.terminalId} has been frozen successfully`)}
                          className="h-8 w-8 p-0"
                        >
                          <XCircleIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Terminal Activated", `Terminal ${terminal.terminalId} has been activated successfully`)}
                          className="h-8 w-8 p-0"
                        >
                          <CheckCircleIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setSelectedTerminal(terminal);
                            setShowAssignTerminalModal(true);
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <UserIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTransactions = () => (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1E293B] mb-2">Transaction Management</h1>
          <p className="text-[#64748B] text-lg">Monitor and manage all platform transactions</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 flex items-center gap-2">
            <DownloadIcon className="w-4 h-4" />
            Export Transactions
          </Button>
          <Button 
            className="h-12 px-6 bg-[#7C3AED] text-white hover:bg-[#6D28D9]"
            onClick={() => showSuccess("Transaction Updated", "Transaction status has been updated successfully")}
          >
            <RefreshCwIcon className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Transaction Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <CreditCardIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">Total Transactions</p>
                <p className="text-2xl font-bold text-[#1E293B]">45.6M</p>
                <p className="text-sm text-blue-600 font-medium">All time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <CheckCircleIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">Success Rate</p>
                <p className="text-2xl font-bold text-[#1E293B]">98.2%</p>
                <p className="text-sm text-green-600 font-medium">Last 30 days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <DollarSignIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">Total Volume</p>
                <p className="text-2xl font-bold text-[#1E293B]">₦125B</p>
                <p className="text-sm text-purple-600 font-medium">All time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <AlertTriangleIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">Disputed</p>
                <p className="text-2xl font-bold text-[#1E293B]">1,234</p>
                <p className="text-sm text-orange-600 font-medium">Under review</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-[#1E293B]">Recent Transactions</h2>
            <div className="flex gap-4">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <Input
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80 h-12"
                />
              </div>
              <select 
                className="px-4 py-3 border border-gray-300 rounded-lg text-sm h-12 min-w-[140px]"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">TRANSACTION ID</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">AMOUNT</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">TYPE</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">STATUS</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">USER</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">REGION</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">DATE & TIME</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-sm font-medium text-[#1E293B]">{transaction.id}</td>
                    <td className="py-4 px-6 text-sm font-medium text-[#1E293B]">₦{transaction.amount.toLocaleString()}</td>
                    <td className="py-4 px-6 text-sm text-[#64748B]">{transaction.type}</td>
                    <td className="py-4 px-6">
                      <Badge className={
                        transaction.status === "Completed" ? "bg-green-100 text-green-800" :
                        transaction.status === "Failed" ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800"
                      }>
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-sm text-[#64748B]">{transaction.user}</td>
                    <td className="py-4 px-6 text-sm text-[#64748B]">{transaction.region}</td>
                    <td className="py-4 px-6 text-sm text-[#64748B]">{transaction.date} {transaction.time}</td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Transaction Reversed", `Transaction ${transaction.id} has been reversed successfully`)}
                          className="h-8 w-8 p-0"
                        >
                          <RotateCcwIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontalIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCards = () => (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1E293B] mb-2">Card Management</h1>
          <p className="text-[#64748B] text-lg">Manage all platform cards and card operations</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 flex items-center gap-2">
            <DownloadIcon className="w-4 h-4" />
            Export Card Data
          </Button>
          <Button 
            className="h-12 px-6 bg-[#7C3AED] text-white hover:bg-[#6D28D9]"
            onClick={() => showSuccess("Card Issued", "New card has been issued successfully")}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Issue Card
          </Button>
        </div>
      </div>

      {/* Card Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <CreditCardIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">Total Cards</p>
                <p className="text-2xl font-bold text-[#1E293B]">125,847</p>
                <p className="text-sm text-blue-600 font-medium">All regions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <CheckCircleIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">Active Cards</p>
                <p className="text-2xl font-bold text-[#1E293B]">98,234</p>
                <p className="text-sm text-green-600 font-medium">Currently active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <XCircleIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">Blocked Cards</p>
                <p className="text-2xl font-bold text-[#1E293B]">2,156</p>
                <p className="text-sm text-red-600 font-medium">Security blocks</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                <ClockIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">Expired Cards</p>
                <p className="text-2xl font-bold text-[#1E293B]">25,457</p>
                <p className="text-sm text-yellow-600 font-medium">Need renewal</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cards Table */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-[#1E293B]">Platform Cards</h2>
            <div className="flex gap-4">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <Input
                  placeholder="Search cards..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80 h-12"
                />
              </div>
              <select 
                className="px-4 py-3 border border-gray-300 rounded-lg text-sm h-12 min-w-[140px]"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">CARD ID</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">CARD NUMBER</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">HOLDER NAME</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">TYPE</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">STATUS</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">SPENDING LIMIT</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">MONTHLY SPENT</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">REGION</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {cards.map((card) => (
                  <tr key={card.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-sm font-medium text-[#1E293B]">{card.id}</td>
                    <td className="py-4 px-6 text-sm text-[#64748B]">{card.cardNumber}</td>
                    <td className="py-4 px-6 text-sm text-[#64748B]">{card.holderName}</td>
                    <td className="py-4 px-6">
                      <Badge variant="outline">{card.type}</Badge>
                    </td>
                    <td className="py-4 px-6">
                      <Badge className={
                        card.status === "Active" ? "bg-green-100 text-green-800" :
                        card.status === "Blocked" ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800"
                      }>
                        {card.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-sm text-[#64748B]">₦{card.spendingLimit.toLocaleString()}</td>
                    <td className="py-4 px-6 text-sm text-[#64748B]">₦{card.monthlySpent.toLocaleString()}</td>
                    <td className="py-4 px-6 text-sm text-[#64748B]">{card.region}</td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Card Blocked", `Card ${card.cardNumber} has been blocked successfully`)}
                          className="h-8 w-8 p-0"
                        >
                          <XIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Card Activated", `Card ${card.cardNumber} has been activated successfully`)}
                          className="h-8 w-8 p-0"
                        >
                          <CheckIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderKYC = () => (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1E293B] mb-2">KYC Management</h1>
          <p className="text-[#64748B] text-lg">Manage individual user identity verification</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 flex items-center gap-2">
            <DownloadIcon className="w-4 h-4" />
            Export KYC Data
          </Button>
          <Button 
            className="h-12 px-6 bg-[#7C3AED] text-white hover:bg-[#6D28D9]"
            onClick={() => showSuccess("KYC Approved", "KYC verification has been approved and user has been notified")}
          >
            <CheckCircleIcon className="w-4 h-4 mr-2" />
            Bulk Approve
          </Button>
        </div>
      </div>

      {/* KYC Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <FileTextIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">Total KYC Cases</p>
                <p className="text-2xl font-bold text-[#1E293B]">45,623</p>
                <p className="text-sm text-blue-600 font-medium">All time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <CheckCircleIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">Approved</p>
                <p className="text-2xl font-bold text-[#1E293B]">42,156</p>
                <p className="text-sm text-green-600 font-medium">92.4% approval rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                <ClockIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">Under Review</p>
                <p className="text-2xl font-bold text-[#1E293B]">2,345</p>
                <p className="text-sm text-yellow-600 font-medium">Avg 2.4 days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <XCircleIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">Rejected</p>
                <p className="text-2xl font-bold text-[#1E293B]">1,122</p>
                <p className="text-sm text-red-600 font-medium">2.5% rejection rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KYC Cases Table */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-[#1E293B]">KYC Verification Cases</h2>
            <div className="flex gap-4">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <Input
                  placeholder="Search KYC cases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80 h-12"
                />
              </div>
              <select 
                className="px-4 py-3 border border-gray-300 rounded-lg text-sm h-12 min-w-[140px]"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="under-review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">USER</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">CURRENT TIER</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">REQUESTED TIER</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">DOCUMENTS</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">STATUS</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">SUBMITTED</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">REGION</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {kycCases.map((kycCase) => (
                  <tr key={kycCase.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-[#7C3AED] text-white">
                            {kycCase.userName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-[#1E293B]">{kycCase.userName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant="outline">{kycCase.currentTier}</Badge>
                    </td>
                    <td className="py-4 px-6">
                      <Badge className="bg-blue-100 text-blue-800">{kycCase.requestedTier}</Badge>
                    </td>
                    <td className="py-4 px-6 text-sm text-[#64748B]">{kycCase.documents} documents</td>
                    <td className="py-4 px-6">
                      <Badge className={
                        kycCase.status === "Approved" ? "bg-green-100 text-green-800" :
                        kycCase.status === "Rejected" ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800"
                      }>
                        {kycCase.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-sm text-[#64748B]">{kycCase.submittedDate}</td>
                    <td className="py-4 px-6 text-sm text-[#64748B]">{kycCase.region}</td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("KYC Approved", `${kycCase.userName}'s KYC has been approved successfully`)}
                          className="h-8 w-8 p-0"
                        >
                          <CheckIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("KYC Rejected", `${kycCase.userName}'s KYC has been rejected and user notified`)}
                          className="h-8 w-8 p-0"
                        >
                          <XIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderKYB = () => (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1E293B] mb-2">KYB Management</h1>
          <p className="text-[#64748B] text-lg">Manage business verification and compliance</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 flex items-center gap-2">
            <DownloadIcon className="w-4 h-4" />
            Export KYB Data
          </Button>
          <Button 
            className="h-12 px-6 bg-[#7C3AED] text-white hover:bg-[#6D28D9]"
            onClick={() => showSuccess("KYB Approved", "Business verification has been approved and business has been notified")}
          >
            <CheckCircleIcon className="w-4 h-4 mr-2" />
            Bulk Approve
          </Button>
        </div>
      </div>

      {/* KYB Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <BuildingIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">Total KYB Cases</p>
                <p className="text-2xl font-bold text-[#1E293B]">12,456</p>
                <p className="text-sm text-blue-600 font-medium">All time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <CheckCircleIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">Approved</p>
                <p className="text-2xl font-bold text-[#1E293B]">10,234</p>
                <p className="text-sm text-green-600 font-medium">82.2% approval rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                <ClockIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">Under Review</p>
                <p className="text-2xl font-bold text-[#1E293B]">1,567</p>
                <p className="text-sm text-yellow-600 font-medium">Avg 5.2 days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <XCircleIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">Rejected</p>
                <p className="text-2xl font-bold text-[#1E293B]">655</p>
                <p className="text-sm text-red-600 font-medium">5.3% rejection rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KYB Cases Table */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-[#1E293B]">Business Verification Cases</h2>
            <div className="flex gap-4">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <Input
                  placeholder="Search KYB cases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80 h-12"
                />
              </div>
              <select 
                className="px-4 py-3 border border-gray-300 rounded-lg text-sm h-12 min-w-[140px]"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="under-review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">BUSINESS</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">CURRENT TIER</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">REQUESTED TIER</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">DOCUMENTS</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">STATUS</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">SUBMITTED</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">REGION</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {kybCases.map((kybCase) => (
                  <tr key={kybCase.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                          <BuildingIcon className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-medium text-[#1E293B]">{kybCase.businessName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant="outline">{kybCase.currentTier}</Badge>
                    </td>
                    <td className="py-4 px-6">
                      <Badge className="bg-blue-100 text-blue-800">{kybCase.requestedTier}</Badge>
                    </td>
                    <td className="py-4 px-6 text-sm text-[#64748B]">{kybCase.documents} documents</td>
                    <td className="py-4 px-6">
                      <Badge className={
                        kybCase.status === "Approved" ? "bg-green-100 text-green-800" :
                        kybCase.status === "Rejected" ? "bg-red-100 text-red-800" :
                        kybCase.status === "Under Review" ? "bg-yellow-100 text-yellow-800" :
                        "bg-orange-100 text-orange-800"
                      }>
                        {kybCase.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-sm text-[#64748B]">{kybCase.submittedDate}</td>
                    <td className="py-4 px-6 text-sm text-[#64748B]">{kybCase.region}</td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("KYB Approved", `${kybCase.businessName}'s KYB has been approved successfully`)}
                          className="h-8 w-8 p-0"
                        >
                          <CheckIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("KYB Rejected", `${kybCase.businessName}'s KYB has been rejected and business notified`)}
                          className="h-8 w-8 p-0"
                        >
                          <XIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRegional = () => (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1E293B] mb-2">Regional Management</h1>
          <p className="text-[#64748B] text-lg">Manage multi-regional platform with separate databases</p>
        </div>
        <Button 
          className="h-12 px-6 bg-[#7C3AED] text-white hover:bg-[#6D28D9]"
          onClick={() => showSuccess("Region Added", "New region has been added with separate database successfully")}
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Region
        </Button>
      </div>

      {/* Regional Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <GlobeIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">Total Regions</p>
                <p className="text-2xl font-bold text-[#1E293B]">12</p>
                <p className="text-sm text-blue-600 font-medium">Worldwide</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <CheckCircleIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">Active Regions</p>
                <p className="text-2xl font-bold text-[#1E293B]">10</p>
                <p className="text-sm text-green-600 font-medium">Operational</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                <ClockIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">Pending Setup</p>
                <p className="text-2xl font-bold text-[#1E293B]">2</p>
                <p className="text-sm text-yellow-600 font-medium">In progress</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <DatabaseIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">Databases</p>
                <p className="text-2xl font-bold text-[#1E293B]">12</p>
                <p className="text-sm text-purple-600 font-medium">Separate instances</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regions Table */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-8">
          <h2 className="text-xl font-bold text-[#1E293B] mb-8">Regional Overview</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">REGION</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">CODE</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">USERS</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">ADMINS</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">STATUS</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">DATABASE</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">LAST UPDATE</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {regions.map((region) => (
                  <tr key={region.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                          <MapPinIcon className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-medium text-[#1E293B]">{region.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-[#64748B]">{region.code}</td>
                    <td className="py-4 px-6 text-sm text-[#64748B]">{region.users.toLocaleString()}</td>
                    <td className="py-4 px-6 text-sm text-[#64748B]">{region.admins}</td>
                    <td className="py-4 px-6">
                      <Badge className={
                        region.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }>
                        {region.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-sm text-[#64748B]">{region.database}</td>
                    <td className="py-4 px-6 text-sm text-[#64748B]">{region.lastUpdate}</td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <EditIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("Region Updated", `${region.name} region configuration has been updated successfully`)}
                          className="h-8 w-8 p-0"
                        >
                          <SettingsIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAPI = () => (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1E293B] mb-2">API Management</h1>
          <p className="text-[#64748B] text-lg">Monitor API endpoints, rate limits, and performance</p>
        </div>
        <Button 
          className="h-12 px-6 bg-[#7C3AED] text-white hover:bg-[#6D28D9]"
          onClick={() => showSuccess("API Updated", "API endpoint configuration has been updated successfully")}
        >
          <CodeIcon className="w-4 h-4 mr-2" />
          Configure API
        </Button>
      </div>

      {/* API Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <CodeIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">Total Endpoints</p>
                <p className="text-2xl font-bold text-[#1E293B]">127</p>
                <p className="text-sm text-blue-600 font-medium">Active endpoints</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <TrendingUpIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">API Calls Today</p>
                <p className="text-2xl font-bold text-[#1E293B]">2.8M</p>
                <p className="text-sm text-green-600 font-medium">+15% from yesterday</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <CheckCircleIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">Success Rate</p>
                <p className="text-2xl font-bold text-[#1E293B]">99.8%</p>
                <p className="text-sm text-purple-600 font-medium">Last 24 hours</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <ClockIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">Avg Response</p>
                <p className="text-2xl font-bold text-[#1E293B]">145ms</p>
                <p className="text-sm text-orange-600 font-medium">Global average</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API Endpoints Table */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-8">
          <h2 className="text-xl font-bold text-[#1E293B] mb-8">API Endpoints</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">API ID</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">ENDPOINT</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">METHOD</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">CALLS TODAY</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">SUCCESS RATE</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">AVG RESPONSE</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">STATUS</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-[#64748B] uppercase tracking-wider">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {apiEndpoints.map((endpoint) => (
                  <tr key={endpoint.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-sm font-medium text-[#1E293B]">{endpoint.id}</td>
                    <td className="py-4 px-6 text-sm text-[#64748B]">{endpoint.endpoint}</td>
                    <td className="py-4 px-6">
                      <Badge variant="outline">{endpoint.method}</Badge>
                    </td>
                    <td className="py-4 px-6 text-sm text-[#64748B]">{endpoint.calls.toLocaleString()}</td>
                    <td className="py-4 px-6 text-sm text-[#64748B]">{endpoint.successRate}</td>
                    <td className="py-4 px-6 text-sm text-[#64748B]">{endpoint.avgResponse}</td>
                    <td className="py-4 px-6">
                      <Badge className={
                        endpoint.status === "Healthy" ? "bg-green-100 text-green-800" :
                        endpoint.status === "Warning" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }>
                        {endpoint.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <SettingsIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => showSuccess("API Updated", `API endpoint ${endpoint.endpoint} has been updated successfully`)}
                          className="h-8 w-8 p-0"
                        >
                          <RefreshCwIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSystemHealth = () => (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1E293B] mb-2">System Health Analytics</h1>
          <p className="text-[#64748B] text-lg">Monitor platform performance, uptime, and system metrics</p>
        </div>
        <Button 
          className="h-12 px-6 bg-[#7C3AED] text-white hover:bg-[#6D28D9]"
          onClick={() => showSuccess("Health Check Completed", "System health check has been completed successfully")}
        >
          <ActivityIcon className="w-4 h-4 mr-2" />
          Run Health Check
        </Button>
      </div>

      {/* System Health Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <ActivityIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">System Uptime</p>
                <p className="text-2xl font-bold text-[#1E293B]">99.97%</p>
                <p className="text-sm text-green-600 font-medium">Last 30 days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <ClockIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">Response Time</p>
                <p className="text-2xl font-bold text-[#1E293B]">145ms</p>
                <p className="text-sm text-blue-600 font-medium">Average</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <ServerIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">CPU Usage</p>
                <p className="text-2xl font-bold text-[#1E293B]">67%</p>
                <p className="text-sm text-purple-600 font-medium">Current</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <HardDriveIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#64748B] mb-1">Memory Usage</p>
                <p className="text-2xl font-bold text-[#1E293B]">78%</p>
                <p className="text-sm text-orange-600 font-medium">Current</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Status */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-8">
          <h2 className="text-xl font-bold text-[#1E293B] mb-8">Service Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "API Gateway", status: "Healthy", uptime: "99.9%" },
              { name: "Database", status: "Healthy", uptime: "99.8%" },
              { name: "Payment Service", status: "Healthy", uptime: "99.7%" },
              { name: "Authentication", status: "Healthy", uptime: "99.9%" },
              { name: "Notification Service", status: "Warning", uptime: "98.5%" },
              { name: "File Storage", status: "Healthy", uptime: "99.6%" }
            ].map((service, index) => (
              <div key={index} className="flex items-center justify-between p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded-full ${
                    service.status === "Healthy" ? "bg-green-500" :
                    service.status === "Warning" ? "bg-yellow-500" :
                    "bg-red-500"
                  }`}></div>
                  <span className="font-semibold text-[#1E293B]">{service.name}</span>
                </div>
                <div className="text-right">
                  <Badge className={
                    service.status === "Healthy" ? "bg-green-100 text-green-800" :
                    service.status === "Warning" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }>
                    {service.status}
                  </Badge>
                  <p className="text-sm text-[#64748B] mt-1 font-medium">{service.uptime}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Render current page content
  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return renderDashboard();
      case "users":
        return renderUsers();
      case "pos":
        return renderPOS();
      case "transactions":
        return renderTransactions();
      case "cards":
        return renderCards();
      case "kyc":
        return renderKYC();
      case "kyb":
        return renderKYB();
      case "regional":
        return renderRegional();
      case "api":
        return renderAPI();
      case "system-health":
        return renderSystemHealth();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-2xl">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-[#1E293B] mb-3">{successMessage.title}</h3>
            <p className="text-[#64748B] mb-8 text-lg">{successMessage.message}</p>
            <Button 
              className="bg-[#7C3AED] text-white hover:bg-[#6D28D9] h-12 px-8"
              onClick={() => setShowSuccessModal(false)}
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Add Terminal Modal */}
      {showAddTerminalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-[#1E293B]">Add New POS Terminal</h3>
                <p className="text-[#64748B] mt-1">Configure a new terminal for the system</p>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => setShowAddTerminalModal(false)}
                className="h-10 w-10 p-0"
              >
                <XIcon className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#1E293B] mb-2">Terminal ID</label>
                <Input
                  placeholder="e.g., TRM12350"
                  value={terminalFormData.terminalId}
                  onChange={(e) => setTerminalFormData({...terminalFormData, terminalId: e.target.value})}
                  className="h-12"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1E293B] mb-2">Serial Number</label>
                <Input
                  placeholder="e.g., SN001239"
                  value={terminalFormData.serialNumber}
                  onChange={(e) => setTerminalFormData({...terminalFormData, serialNumber: e.target.value})}
                  className="h-12"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1E293B] mb-2">Merchant Name</label>
                <Input
                  placeholder="e.g., New Store"
                  value={terminalFormData.merchantName}
                  onChange={(e) => setTerminalFormData({...terminalFormData, merchantName: e.target.value})}
                  className="h-12"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1E293B] mb-2">Model</label>
                <select 
                  value={terminalFormData.model}
                  onChange={(e) => setTerminalFormData({...terminalFormData, model: e.target.value})}
                  className="w-full h-12 px-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Model</option>
                  <option value="POS-X1">POS-X1</option>
                  <option value="POS-X2">POS-X2</option>
                  <option value="POS-X3">POS-X3</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-[#1E293B] mb-2">Location</label>
                <Input
                  placeholder="e.g., Lagos, Nigeria"
                  value={terminalFormData.location}
                  onChange={(e) => setTerminalFormData({...terminalFormData, location: e.target.value})}
                  className="h-12"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1E293B] mb-2">Region</label>
                <select 
                  value={terminalFormData.region}
                  onChange={(e) => setTerminalFormData({...terminalFormData, region: e.target.value})}
                  className="w-full h-12 px-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Region</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Kenya">Kenya</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1E293B] mb-2">Daily Limit</label>
                <Input
                  placeholder="e.g., 1000000"
                  value={terminalFormData.dailyLimit}
                  onChange={(e) => setTerminalFormData({...terminalFormData, dailyLimit: e.target.value})}
                  className="h-12"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <Button 
                variant="outline" 
                onClick={() => setShowAddTerminalModal(false)}
                className="flex-1 h-12"
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 h-12 bg-[#7C3AED] text-white hover:bg-[#6D28D9]"
                onClick={() => {
                  setShowAddTerminalModal(false);
                  showSuccess("Terminal Added", "New POS terminal has been added to the system successfully");
                }}
              >
                Add Terminal
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Terminal Modal */}
      {showAssignTerminalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-[#1E293B]">Assign POS Terminal</h3>
                <p className="text-[#64748B] mt-1">Assign terminal to a business user</p>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => setShowAssignTerminalModal(false)}
                className="h-10 w-10 p-0"
              >
                <XIcon className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#1E293B] mb-2">Select Terminal</label>
                <select className="w-full h-12 px-3 border border-gray-300 rounded-lg">
                  <option value="">Choose unassigned terminal</option>
                  {posTerminals.filter(t => !t.assignedUser).map((terminal) => (
                    <option key={terminal.id} value={terminal.id}>
                      {terminal.terminalId} - {terminal.location}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1E293B] mb-2">Select Business User</label>
                <select className="w-full h-12 px-3 border border-gray-300 rounded-lg">
                  <option value="">Choose business user</option>
                  {users.filter(u => u.type === "Business").map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.firstName} {user.lastName} - {user.region}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1E293B] mb-2">Assignment Notes</label>
                <textarea 
                  placeholder="Add any notes about this assignment..."
                  className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg resize-none"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <Button 
                variant="outline" 
                onClick={() => setShowAssignTerminalModal(false)}
                className="flex-1 h-12"
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 h-12 bg-[#7C3AED] text-white hover:bg-[#6D28D9]"
                onClick={() => {
                  setShowAssignTerminalModal(false);
                  showSuccess("Terminal Assigned", "POS terminal has been assigned to business user successfully");
                }}
              >
                Assign Terminal
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {showUserDetailsModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-[#1E293B]">User Details</h3>
                <p className="text-[#64748B] mt-1">View and edit user information</p>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => setShowUserDetailsModal(false)}
                className="h-10 w-10 p-0"
              >
                <XIcon className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-[#7C3AED] text-white text-xl">
                    {selectedUser.firstName[0]}{selectedUser.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-xl font-bold text-[#1E293B]">{selectedUser.firstName} {selectedUser.lastName}</h4>
                  <p className="text-[#64748B]">{selectedUser.email}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge className={
                      selectedUser.type === "Individual" ? "bg-blue-100 text-blue-800" :
                      selectedUser.type === "Business" ? "bg-green-100 text-green-800" :
                      "bg-purple-100 text-purple-800"
                    }>
                      {selectedUser.type}
                    </Badge>
                    <Badge className="bg-green-100 text-green-800">{selectedUser.status}</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#1E293B] mb-2">First Name</label>
                  <Input
                    value={selectedUser.firstName}
                    className="h-12"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1E293B] mb-2">Last Name</label>
                  <Input
                    value={selectedUser.lastName}
                    className="h-12"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1E293B] mb-2">Email Address</label>
                  <Input
                    value={selectedUser.email}
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1E293B] mb-2">Phone Number</label>
                  <Input
                    value={selectedUser.phone}
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1E293B] mb-2">User Type</label>
                  <select className="w-full h-12 px-3 border border-gray-300 rounded-lg">
                    <option value={selectedUser.type}>{selectedUser.type}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1E293B] mb-2">Account Status</label>
                  <select className="w-full h-12 px-3 border border-gray-300 rounded-lg">
                    <option value="Active">Active</option>
                    <option value="Frozen">Frozen</option>
                    <option value="Deactivated">Deactivated</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <Button 
                variant="outline" 
                onClick={() => setShowUserDetailsModal(false)}
                className="flex-1 h-12"
              >
                Cancel
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  setShowUserDetailsModal(false);
                  showSuccess("User Frozen", `${selectedUser.firstName} ${selectedUser.lastName}'s account has been frozen`);
                }}
                className="h-12 px-6 border-red-300 text-red-700 hover:bg-red-50"
              >
                Freeze Account
              </Button>
              <Button 
                className="h-12 px-6 bg-[#7C3AED] text-white hover:bg-[#6D28D9]"
                onClick={() => {
                  setShowUserDetailsModal(false);
                  showSuccess("User Updated", `${selectedUser.firstName} ${selectedUser.lastName}'s information has been updated successfully`);
                }}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <CrownIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#1E293B]">SureBanker Super Admin</h1>
                <p className="text-sm text-[#64748B]">Platform Control Center</p>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-sm font-semibold">
              Super Admin
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="relative h-12 w-12">
              <BellIcon className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {posNotifications.filter(n => !n.isRead).length}
                </span>
              </span>
            </Button>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-semibold text-[#1E293B]">Sarah SuperAdmin</div>
                <div className="text-xs text-[#64748B]">Platform Controller</div>
              </div>
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold">
                  SS
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto sticky top-0">
          <div className="p-6">
            <div className="mb-8">
              <img 
                src="/Logo Main Trans.png" 
                alt="SureBanker" 
                className="h-10 w-auto object-contain mb-4"
              />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">System Operational</span>
              </div>
            </div>
            
            <h2 className="text-lg font-bold text-[#1E293B] mb-6">Control Panel</h2>
            <div className="space-y-2">
              {superAdminNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                    currentPage === item.id
                      ? "bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white shadow-lg"
                      : "text-[#64748B] hover:bg-gray-50 hover:text-[#7C3AED]"
                  }`}
                >
                  <div className={`${currentPage === item.id ? 'text-white' : ''}`}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{item.name}</div>
                    <div className={`text-xs ${currentPage === item.id ? "text-purple-100" : "text-gray-500"}`}>
                      {item.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
};