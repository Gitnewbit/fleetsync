import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

// ─── MODALS DEFINED OUTSIDE App TO PREVENT REMOUNT ON KEYPRESS ────────────────

const AddCustomerModal = ({ newCustomer, setNewCustomer, onClose, onSubmit }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h2>Add New Customer</h2>
        <button className="modal-close" onClick={onClose}>✕</button>
      </div>
      <div className="modal-content">
        <div className="form-group">
          <label>Customer ID *</label>
          <input type="text" placeholder="e.g., CUST-001" value={newCustomer.customerId}
            onChange={(e) => setNewCustomer(prev => ({...prev, customerId: e.target.value}))} />
        </div>
        <div className="form-group">
          <label>Customer Name *</label>
          <input type="text" placeholder="e.g., Acme Corp" value={newCustomer.customerName}
            onChange={(e) => setNewCustomer(prev => ({...prev, customerName: e.target.value}))} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="admin@company.com" value={newCustomer.contactEmail}
            onChange={(e) => setNewCustomer(prev => ({...prev, contactEmail: e.target.value}))} />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="tel" placeholder="(555) 123-4567" value={newCustomer.contactPhone}
            onChange={(e) => setNewCustomer(prev => ({...prev, contactPhone: e.target.value}))} />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input type="text" placeholder="Street address" value={newCustomer.address}
            onChange={(e) => setNewCustomer(prev => ({...prev, address: e.target.value}))} />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>City</label>
            <input type="text" value={newCustomer.city}
              onChange={(e) => setNewCustomer(prev => ({...prev, city: e.target.value}))} />
          </div>
          <div className="form-group">
            <label>State</label>
            <input type="text" placeholder="NY" value={newCustomer.state}
              onChange={(e) => setNewCustomer(prev => ({...prev, state: e.target.value}))} />
          </div>
          <div className="form-group">
            <label>ZIP Code</label>
            <input type="text" value={newCustomer.zipCode}
              onChange={(e) => setNewCustomer(prev => ({...prev, zipCode: e.target.value}))} />
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button className="btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn-primary" onClick={onSubmit}>Create Customer</button>
      </div>
    </div>
  </div>
);

const AddDeviceModal = ({ newDevice, setNewDevice, onClose, onSubmit }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h2>Add New Device</h2>
        <button className="modal-close" onClick={onClose}>✕</button>
      </div>
      <div className="modal-content">
        <div className="form-group">
          <label>Device Name *</label>
          <input type="text" placeholder="e.g., Main Lobby Copier" value={newDevice.name}
            onChange={(e) => setNewDevice(prev => ({...prev, name: e.target.value}))} />
        </div>
        <div className="form-group">
          <label>Model</label>
          <input type="text" placeholder="e.g., Xerox C7030" value={newDevice.model}
            onChange={(e) => setNewDevice(prev => ({...prev, model: e.target.value}))} />
        </div>
        <div className="form-group">
          <label>IP Address *</label>
          <input type="text" placeholder="192.168.1.100" value={newDevice.ipAddress}
            onChange={(e) => setNewDevice(prev => ({...prev, ipAddress: e.target.value}))} />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input type="text" placeholder="e.g., Floor 2, Lobby" value={newDevice.location}
            onChange={(e) => setNewDevice(prev => ({...prev, location: e.target.value}))} />
        </div>
        <div className="form-group">
          <label>Serial Number</label>
          <input type="text" value={newDevice.serialNumber}
            onChange={(e) => setNewDevice(prev => ({...prev, serialNumber: e.target.value}))} />
        </div>
        <div className="form-group">
          <label>SNMP Community</label>
          <input type="text" placeholder="public" value={newDevice.snmpCommunity}
            onChange={(e) => setNewDevice(prev => ({...prev, snmpCommunity: e.target.value}))} />
        </div>
      </div>
      <div className="modal-footer">
        <button className="btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn-primary" onClick={onSubmit}>Add Device</button>
      </div>
    </div>
  </div>
);

const DeviceDetailModal = ({ selectedDevice, onClose }) => {
  if (!selectedDevice) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{selectedDevice.name}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-content detailed">
          <div className="device-detail-grid">
            <div className="detail-section">
              <h3>Device Information</h3>
              <div className="detail-row"><span>Model:</span><strong>{selectedDevice.model}</strong></div>
              <div className="detail-row"><span>Serial:</span><strong>{selectedDevice.serialNumber}</strong></div>
              <div className="detail-row"><span>IP:</span><strong>{selectedDevice.ipAddress}</strong></div>
              <div className="detail-row"><span>Location:</span><strong>{selectedDevice.location}</strong></div>
              <div className="detail-row"><span>Status:</span><strong className={`status-badge ${selectedDevice.status}`}>{selectedDevice.status}</strong></div>
              <div className="detail-row"><span>Last Update:</span><strong>{new Date(selectedDevice.lastUpdate).toLocaleString()}</strong></div>
            </div>
            <div className="detail-section">
              <h3>Page Counts</h3>
              <div className="detail-row"><span>Total Pages:</span><strong>{selectedDevice.pageCount?.toLocaleString()}</strong></div>
              <div className="detail-row"><span>B&W Pages:</span><strong>{selectedDevice.bwPages?.toLocaleString()}</strong></div>
              <div className="detail-row"><span>Color Pages:</span><strong>{selectedDevice.colorPages?.toLocaleString()}</strong></div>
            </div>
            <div className="detail-section">
              <h3>Toner Levels</h3>
              {['Black','Cyan','Magenta','Yellow'].map(color => {
                const key = `toner${color}`;
                const level = selectedDevice[key];
                return (
                  <div key={color} className="toner-row">
                    <span>{color}</span>
                    <div className="toner-bar-wrap">
                      <div className="toner-bar" style={{width:`${level}%`, background: color==='Black'?'#333':color==='Cyan'?'#00bcd4':color==='Magenta'?'#e91e63':'#ffc107'}}/>
                    </div>
                    <span>{level}%</span>
                  </div>
                );
              })}
            </div>
            <div className="detail-section">
              <h3>Error Codes</h3>
              {selectedDevice.errorCodes?.length > 0
                ? selectedDevice.errorCodes.map((e,i) => <div key={i} className="error-code">⚠️ {e}</div>)
                : <div className="no-errors">✅ No active errors</div>}
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

// ─── Installer download — generates a real .bat script customised per customer ─
const downloadInstallerBat = (customer, installerData, apiUrl, collectionInterval) => {
  const customerId = customer.id;
  const customerName = customer.name;
  const apiEndpoint = apiUrl || 'https://your-fleetsync-api.com';
  const interval = collectionInterval || 300;

  const batContent = `@echo off
:: ====================================================
:: FleetSync Pro - SNMP Collector Installer
:: Customer: ${customerName} (${customerId})
:: Generated: ${new Date().toISOString()}
:: ====================================================

echo FleetSync Pro Installer for ${customerName}
echo ================================================

:: Check for Python
python --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Python is not installed. Installing...
    powershell -Command "Invoke-WebRequest -Uri 'https://www.python.org/ftp/python/3.11.0/python-3.11.0-amd64.exe' -OutFile '%TEMP%\\python_installer.exe'"
    %TEMP%\\python_installer.exe /quiet InstallAllUsers=1 PrependPath=1 Include_test=0
    echo Python installed.
) ELSE (
    echo Python found. Skipping installation.
)

:: Install required packages
echo Installing required Python packages...
pip install pysnmp requests schedule --quiet

:: Create install directory
set INSTALL_DIR=%PROGRAMFILES%\\FleetSync
mkdir "%INSTALL_DIR%" 2>nul

:: Write the SNMP collector script
echo Writing collector script...
(
echo import json, time, requests, schedule, logging, socket
echo from datetime import datetime
echo from pysnmp.hlapi import ^*
echo.
echo # ---- Configuration ----
echo CUSTOMER_ID = "${customerId}"
echo CUSTOMER_NAME = "${customerName}"
echo API_URL = "${apiEndpoint}/api/snmp-data"
echo COLLECTION_INTERVAL = ${interval}
echo.
echo logging.basicConfig^(level=logging.INFO, format="[%%^(asctime^)s] %%^(message^)s",
echo     handlers=[logging.FileHandler^("C:\\\\FleetSync\\\\collector.log"^), logging.StreamHandler^(^)]^)
echo.
echo SNMP_OIDS = {
echo     "pageCount":       "1.3.6.1.2.1.43.10.2.1.4.1.1",
echo     "tonerBlack":      "1.3.6.1.2.1.43.11.1.1.9.1.1",
echo     "tonerCyan":       "1.3.6.1.2.1.43.11.1.1.9.1.2",
echo     "tonerMagenta":    "1.3.6.1.2.1.43.11.1.1.9.1.3",
echo     "tonerYellow":     "1.3.6.1.2.1.43.11.1.1.9.1.4",
echo     "tonerBlackMax":   "1.3.6.1.2.1.43.11.1.1.8.1.1",
echo     "tonerCyanMax":    "1.3.6.1.2.1.43.11.1.1.8.1.2",
echo     "tonerMagentaMax": "1.3.6.1.2.1.43.11.1.1.8.1.3",
echo     "tonerYellowMax":  "1.3.6.1.2.1.43.11.1.1.8.1.4",
echo     "printerStatus":   "1.3.6.1.2.1.25.3.5.1.1.1",
echo }
echo.
echo # Devices configured for this customer — edit as needed
echo DEVICES = [
echo     {"ip": "192.168.1.50", "community": "public", "name": "Main Lobby Copier"},
echo     {"ip": "192.168.1.51", "community": "public", "name": "Finance Copier"},
echo ]
echo.
echo def snmp_get^(ip, community, oid^):
echo     try:
echo         errorIndication, errorStatus, errorIndex, varBinds = next^(
echo             getCmd^(SnmpEngine^(^),
echo                    CommunityData^(community^),
echo                    UdpTransportTarget^(^(ip, 161^), timeout=2, retries=1^),
echo                    ContextData^(^),
echo                    ObjectType^(ObjectIdentity^(oid^)^)^)
echo         ^)
echo         if errorIndication or errorStatus:
echo             return None
echo         for varBind in varBinds:
echo             return int^(varBind[1]^)
echo     except:
echo         return None
echo.
echo def collect_and_send^(^):
echo     results = []
echo     for device in DEVICES:
echo         data = {"name": device["name"], "ipAddress": device["ip"],
echo                 "customerId": CUSTOMER_ID, "timestamp": datetime.utcnow^(^).isoformat^(^)}
echo         for key, oid in SNMP_OIDS.items^(^):
echo             data[key] = snmp_get^(device["ip"], device["community"], oid^)
echo         # Calculate toner percentages
echo         for color in ["Black","Cyan","Magenta","Yellow"]:
echo             cur = data.get^(f"toner{color}"^)
echo             mx  = data.get^(f"toner{color}Max"^)
echo             if cur is not None and mx and mx ^> 0:
echo                 data[f"toner{color}Pct"] = round^(cur / mx ^* 100^)
echo         data["status"] = "online" if data.get^("pageCount"^) is not None else "offline"
echo         results.append^(data^)
echo         logging.info^(f"Collected {device['name']}: {data.get^('status'^)}"^)
echo     try:
echo         r = requests.post^(API_URL, json={"customerId": CUSTOMER_ID, "devices": results},
echo                           timeout=10^)
echo         logging.info^(f"Sent to FleetSync API: {r.status_code}"^)
echo     except Exception as e:
echo         logging.error^(f"Failed to send data: {e}"^)
echo.
echo schedule.every^(COLLECTION_INTERVAL^).seconds.do^(collect_and_send^)
echo logging.info^("FleetSync SNMP Collector started for ${customerName}"^)
echo collect_and_send^(^)
echo while True:
echo     schedule.run_pending^(^)
echo     time.sleep^(10^)
) > "%INSTALL_DIR%\\collector.py"

:: Create startup batch file
echo @echo off > "%INSTALL_DIR%\\start_collector.bat"
echo python "%INSTALL_DIR%\\collector.py" >> "%INSTALL_DIR%\\start_collector.bat"

:: Register as scheduled task to run at startup
schtasks /create /tn "FleetSync Collector - ${customerName}" /tr "python \"%INSTALL_DIR%\\collector.py\"" /sc onstart /ru SYSTEM /f >nul 2>&1

echo.
echo ============================================================
echo  FleetSync Collector installed successfully!
echo  Customer: ${customerName} (${customerId})
echo  API Endpoint: ${apiEndpoint}
echo  Collection Interval: ${interval} seconds
echo  Log file: C:\\FleetSync\\collector.log
echo ============================================================
echo.
echo Starting collector for the first time...
start "" python "%INSTALL_DIR%\\collector.py"
pause
`;

  const blob = new Blob([batContent], { type: 'application/bat' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `FleetSync-Installer-${customerId}.bat`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// ─── Standalone Python SNMP collector (also downloadable) ───────────────────
const downloadSnmpCollector = (customer, apiUrl, collectionInterval) => {
  const script = `#!/usr/bin/env python3
"""
FleetSync Pro - SNMP Collector
Customer: ${customer.name} (${customer.id})
Generated: ${new Date().toISOString()}

Requirements: pip install pysnmp requests schedule
Run: python fleetsync_collector.py
"""

import json, time, requests, schedule, logging
from datetime import datetime
from pysnmp.hlapi import *

# ── Configuration ──────────────────────────────────────────────────────────────
CUSTOMER_ID   = "${customer.id}"
CUSTOMER_NAME = "${customer.name}"
API_URL       = "${apiUrl || 'https://your-fleetsync-api.com'}/api/snmp-data"
INTERVAL_SEC  = ${collectionInterval || 300}

logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s] %(levelname)s %(message)s",
    handlers=[
        logging.FileHandler("fleetsync_collector.log"),
        logging.StreamHandler()
    ]
)

# ── Standard MFP SNMP OIDs (RFC 3805 / Printer MIB) ─────────────────────────
SNMP_OIDS = {
    "pageCount":       "1.3.6.1.2.1.43.10.2.1.4.1.1",
    "tonerBlack":      "1.3.6.1.2.1.43.11.1.1.9.1.1",
    "tonerCyan":       "1.3.6.1.2.1.43.11.1.1.9.1.2",
    "tonerMagenta":    "1.3.6.1.2.1.43.11.1.1.9.1.3",
    "tonerYellow":     "1.3.6.1.2.1.43.11.1.1.9.1.4",
    "tonerBlackMax":   "1.3.6.1.2.1.43.11.1.1.8.1.1",
    "tonerCyanMax":    "1.3.6.1.2.1.43.11.1.1.8.1.2",
    "tonerMagentaMax": "1.3.6.1.2.1.43.11.1.1.8.1.3",
    "tonerYellowMax":  "1.3.6.1.2.1.43.11.1.1.8.1.4",
    "printerStatus":   "1.3.6.1.2.1.25.3.5.1.1.1",
}

# ── Edit this list with the customer's actual printer IPs ────────────────────
DEVICES = [
    {"ip": "192.168.1.50", "community": "public", "name": "Main Lobby Copier",   "serialNumber": ""},
    {"ip": "192.168.1.51", "community": "public", "name": "Finance Department",  "serialNumber": ""},
    # Add more printers here:
    # {"ip": "192.168.1.52", "community": "public", "name": "3rd Floor Copier", "serialNumber": ""},
]


def snmp_get(ip, community, oid):
    """Get a single SNMP value; returns None on failure."""
    try:
        errorIndication, errorStatus, errorIndex, varBinds = next(
            getCmd(
                SnmpEngine(),
                CommunityData(community, mpModel=1),          # SNMPv2c
                UdpTransportTarget((ip, 161), timeout=2, retries=1),
                ContextData(),
                ObjectType(ObjectIdentity(oid))
            )
        )
        if errorIndication or errorStatus:
            return None
        for varBind in varBinds:
            return int(varBind[1])
    except Exception:
        return None


def collect_device(device):
    """Poll one printer via SNMP and return a data dict."""
    ip        = device["ip"]
    community = device["community"]
    data = {
        "name":         device["name"],
        "ipAddress":    ip,
        "serialNumber": device.get("serialNumber", ""),
        "customerId":   CUSTOMER_ID,
        "timestamp":    datetime.utcnow().isoformat() + "Z",
    }
    for key, oid in SNMP_OIDS.items():
        data[key] = snmp_get(ip, community, oid)

    # Calculate toner percentages
    for color in ["Black", "Cyan", "Magenta", "Yellow"]:
        cur = data.get(f"toner{color}")
        mx  = data.get(f"toner{color}Max")
        if cur is not None and mx and mx > 0:
            data[f"toner{color}Pct"] = round(cur / mx * 100)
        else:
            data[f"toner{color}Pct"] = None

    # Determine status
    data["status"] = "online" if data.get("pageCount") is not None else "offline"
    return data


def collect_and_send():
    """Main job: collect all devices and POST to FleetSync API."""
    logging.info(f"Starting collection for {len(DEVICES)} devices...")
    results = [collect_device(d) for d in DEVICES]

    online  = sum(1 for d in results if d["status"] == "online")
    offline = len(results) - online
    logging.info(f"Collected: {online} online, {offline} offline")

    payload = {
        "customerId":   CUSTOMER_ID,
        "customerName": CUSTOMER_NAME,
        "collectedAt":  datetime.utcnow().isoformat() + "Z",
        "devices":      results,
    }

    try:
        response = requests.post(
            API_URL,
            json=payload,
            timeout=15,
            headers={"Content-Type": "application/json"}
        )
        if response.ok:
            logging.info(f"✅ Data sent successfully (HTTP {response.status_code})")
        else:
            logging.warning(f"⚠️  API returned HTTP {response.status_code}: {response.text[:200]}")
    except requests.exceptions.ConnectionError:
        logging.error("❌ Cannot reach FleetSync API. Check internet connection.")
    except Exception as e:
        logging.error(f"❌ Failed to send data: {e}")


# ── Main ──────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    logging.info(f"FleetSync SNMP Collector starting")
    logging.info(f"  Customer : {CUSTOMER_NAME} ({CUSTOMER_ID})")
    logging.info(f"  API URL  : {API_URL}")
    logging.info(f"  Interval : {INTERVAL_SEC}s")
    logging.info(f"  Devices  : {len(DEVICES)}")

    collect_and_send()  # Run immediately on start

    schedule.every(INTERVAL_SEC).seconds.do(collect_and_send)
    while True:
        schedule.run_pending()
        time.sleep(10)
`;

  const blob = new Blob([script], { type: 'text/x-python' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fleetsync_collector_${customer.id}.py`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};


const InstallerModal = ({ selectedCustomerForInstaller, installerSettings, onClose }) => {
  if (!selectedCustomerForInstaller) return null;
  const customer = selectedCustomerForInstaller;
  const { installerData } = customer;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📥 Download Installer</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-content installer-content">
          <div className="installer-info">
            <h3>FleetSync Client Installer for {customer.name}</h3>
            <p>Download a customised installer pre-configured with this customer's API settings and customer ID. The installer sets up SNMP polling on the customer's Windows PC and sends data to your FleetSync server over the internet.</p>

            <div className="installer-details">
              <div className="detail-row"><span>Customer ID:</span><strong>{customer.id}</strong></div>
              <div className="detail-row"><span>Package:</span><strong>{installerData?.packageName}</strong></div>
              <div className="detail-row"><span>Expires:</span><strong>{installerData?.expiresIn}</strong></div>
              <div className="detail-row"><span>API Server:</span><strong>{installerSettings.apiUrl}</strong></div>
              <div className="detail-row"><span>Collection Interval:</span><strong>{installerSettings.collectionInterval}s</strong></div>
            </div>

            <div className="installer-steps">
              <h4>How it works:</h4>
              <ol>
                <li>Download the <strong>.bat installer</strong> (Windows) or <strong>.py collector</strong> (cross-platform)</li>
                <li>Send to customer — they run it on a Windows PC on their LAN</li>
                <li>The script polls all MFPs via SNMP (LAN, port 161)</li>
                <li>Data is sent over HTTPS to your FleetSync API every {installerSettings.collectionInterval}s</li>
                <li>Live data appears in your dashboard automatically</li>
              </ol>
            </div>

            <div className="installer-config">
              <h4>Embedded Configuration:</h4>
              <pre>{JSON.stringify(installerData?.configContent, null, 2)}</pre>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Close</button>
          <button className="btn-outline" onClick={() =>
            downloadSnmpCollector(customer, installerSettings.apiUrl, installerSettings.collectionInterval)
          }>🐍 Download Python Script</button>
          <button className="btn-primary" onClick={() =>
            downloadInstallerBat(customer, installerData, installerSettings.apiUrl, installerSettings.collectionInterval)
          }>⬇️ Download Windows Installer (.bat)</button>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN APP ────────────────────────────────────────────────────────────────

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentCustomer, setCurrentCustomer] = useState('cust-001');
  const [customers, setCustomers] = useState([]);
  const [devices, setDevices] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [showDeviceDetail, setShowDeviceDetail] = useState(false);
  const [showInstallerModal, setShowInstallerModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedCustomerForInstaller, setSelectedCustomerForInstaller] = useState(null);

  const [newCustomer, setNewCustomer] = useState({
    customerId: '', customerName: '', contactEmail: '', contactPhone: '',
    address: '', city: '', state: '', zipCode: ''
  });

  const [newDevice, setNewDevice] = useState({
    name: '', model: '', ipAddress: '', location: '', snmpCommunity: 'public', serialNumber: ''
  });

  const [installerSettings, setInstallerSettings] = useState({
    apiUrl: 'https://your-fleetsync-api.com',
    collectionInterval: 300
  });

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    initializeCustomers();
    fetchAllData();
    const interval = setInterval(fetchAllData, 30000);
    return () => clearInterval(interval);
  }, [currentCustomer]);

  const initializeCustomers = () => {
    setCustomers([
      { id: 'cust-001', name: 'Acme Corporation', email: 'admin@acme.com', phone: '(555) 123-4567',
        address: '123 Business Ave', city: 'New York', state: 'NY', zipCode: '10001', logo: '🏢', devices: 12, status: 'active' },
      { id: 'cust-002', name: 'Global Services Inc', email: 'info@global.com', phone: '(555) 234-5678',
        address: '456 Commerce St', city: 'Los Angeles', state: 'CA', zipCode: '90001', logo: '🌍', devices: 8, status: 'active' },
      { id: 'cust-003', name: 'Tech Solutions Ltd', email: 'support@tech.com', phone: '(555) 345-6789',
        address: '789 Innovation Blvd', city: 'San Francisco', state: 'CA', zipCode: '94105', logo: '💻', devices: 15, status: 'active' }
    ]);
  };

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const devicesData = [
        { id: 'dev-001', name: 'Main Lobby Copier', model: 'Xerox VersaLink C7030', ipAddress: '192.168.1.50',
          location: 'Lobby', status: 'online', pageCount: 1245320, bwPages: 980000, colorPages: 265320,
          tonerBlack: 78, tonerCyan: 65, tonerMagenta: 52, tonerYellow: 88,
          drumBlack: 92, drumCyan: 85, drumMagenta: 78, drumYellow: 95,
          fuserUnit: 88, temperature: 52, errorCodes: [], lastUpdate: new Date().toISOString(), serialNumber: 'XRX-2024-001', snmpCommunity: 'public' },
        { id: 'dev-002', name: 'Finance Department', model: 'Canon imageRUNNER 2745', ipAddress: '192.168.1.51',
          location: 'Floor 2', status: 'online', pageCount: 892450, bwPages: 750000, colorPages: 142450,
          tonerBlack: 34, tonerCyan: 45, tonerMagenta: 56, tonerYellow: 23,
          drumBlack: 45, drumCyan: 52, drumMagenta: 48, drumYellow: 41,
          fuserUnit: 67, temperature: 54, errorCodes: ['W-202: Yellow Toner Low'], lastUpdate: new Date().toISOString(), serialNumber: 'CAN-2024-002', snmpCommunity: 'public' },
        { id: 'dev-003', name: 'Operations', model: 'Ricoh MP C3004', ipAddress: '192.168.1.52',
          location: 'Floor 3', status: 'online', pageCount: 756200, bwPages: 620000, colorPages: 136200,
          tonerBlack: 92, tonerCyan: 78, tonerMagenta: 65, tonerYellow: 34,
          drumBlack: 78, drumCyan: 72, drumMagenta: 68, drumYellow: 55,
          fuserUnit: 92, temperature: 49, errorCodes: [], lastUpdate: new Date().toISOString(), serialNumber: 'RIC-2024-003', snmpCommunity: 'public' },
        { id: 'dev-004', name: 'HR Department', model: 'Konica Minolta bizhub C554', ipAddress: '192.168.1.53',
          location: 'Floor 1', status: 'offline', pageCount: 523100, bwPages: 420000, colorPages: 103100,
          tonerBlack: 15, tonerCyan: 8, tonerMagenta: 12, tonerYellow: 5,
          drumBlack: 20, drumCyan: 18, drumMagenta: 15, drumYellow: 10,
          fuserUnit: 45, temperature: 0, errorCodes: ['E-001: Connection timeout'], lastUpdate: new Date(Date.now()-3600000).toISOString(), serialNumber: 'KM-2024-004', snmpCommunity: 'public' }
      ];
      setDevices(devicesData);
      setAlerts([
        { id: 'alt-001', deviceId: 'dev-002', deviceName: 'Finance Department', type: 'warning', message: 'Yellow toner low (23%)', timestamp: new Date().toISOString(), acknowledged: false },
        { id: 'alt-002', deviceId: 'dev-004', deviceName: 'HR Department', type: 'error', message: 'Device offline', timestamp: new Date().toISOString(), acknowledged: false }
      ]);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomer = () => {
    if (!newCustomer.customerId || !newCustomer.customerName) {
      setError('Customer ID and Name are required');
      return;
    }
    const toAdd = {
      id: newCustomer.customerId,
      name: newCustomer.customerName,
      email: newCustomer.contactEmail,
      phone: newCustomer.contactPhone,
      address: newCustomer.address,
      city: newCustomer.city,
      state: newCustomer.state,
      zipCode: newCustomer.zipCode,
      logo: '🏢',
      devices: 0,
      status: 'active'
    };
    setCustomers(prev => [...prev, toAdd]);
    setShowAddCustomer(false);
    setNewCustomer({ customerId: '', customerName: '', contactEmail: '', contactPhone: '', address: '', city: '', state: '', zipCode: '' });
    alert('✅ Customer added successfully!');
  };

  const handleAddDevice = () => {
    if (!newDevice.name || !newDevice.ipAddress) {
      setError('Device Name and IP Address are required');
      return;
    }
    const deviceToAdd = {
      id: `dev-${Date.now()}`,
      ...newDevice,
      status: 'online',
      pageCount: Math.floor(Math.random() * 1000000),
      bwPages: Math.floor(Math.random() * 800000),
      colorPages: Math.floor(Math.random() * 300000),
      tonerBlack: Math.floor(Math.random() * 100),
      tonerCyan: Math.floor(Math.random() * 100),
      tonerMagenta: Math.floor(Math.random() * 100),
      tonerYellow: Math.floor(Math.random() * 100),
      drumBlack: Math.floor(Math.random() * 100),
      drumCyan: Math.floor(Math.random() * 100),
      drumMagenta: Math.floor(Math.random() * 100),
      drumYellow: Math.floor(Math.random() * 100),
      fuserUnit: Math.floor(Math.random() * 100),
      temperature: Math.floor(Math.random() * 20) + 40,
      errorCodes: [],
      lastUpdate: new Date().toISOString()
    };
    setDevices(prev => [...prev, deviceToAdd]);
    setShowAddDevice(false);
    setNewDevice({ name: '', model: '', ipAddress: '', location: '', snmpCommunity: 'public', serialNumber: '' });
    alert('✅ Device added! SNMP polling will begin on next collection cycle.');
  };

  const handleGenerateInstaller = async (customerId) => {
    const customer = customers.find(c => c.id === customerId);
    if (!customer) return;
    setSelectedCustomerForInstaller({
      ...customer,
      installerData: {
        packageId: `pkg-${Date.now()}`,
        packageName: `FleetSync-${customerId}-${Date.now()}`,
        expiresIn: '7 days',
        configContent: {
          customerId,
          customerName: customer.name,
          apiUrl: installerSettings.apiUrl,
          collectionInterval: installerSettings.collectionInterval
        }
      }
    });
    setShowInstallerModal(true);
  };

  const currentCustomerData = customers.find(c => c.id === currentCustomer);
  const filteredDevices = devices.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.ipAddress.includes(searchQuery)
  );

  const onlineDevices  = devices.filter(d => d.status === 'online').length;
  const offlineDevices = devices.filter(d => d.status === 'offline').length;
  const activeAlerts   = alerts.filter(a => !a.acknowledged).length;

  const DashboardView = () => (
    <div className="view dashboard-view">
      <div className="view-header">
        <h1>Dashboard</h1>
        <span className="customer-tag">{currentCustomerData?.logo} {currentCustomerData?.name}</span>
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🖨️</div>
          <div className="stat-info"><div className="stat-value">{devices.length}</div><div className="stat-label">Total Devices</div></div>
        </div>
        <div className="stat-card online">
          <div className="stat-icon">✅</div>
          <div className="stat-info"><div className="stat-value">{onlineDevices}</div><div className="stat-label">Online</div></div>
        </div>
        <div className="stat-card offline">
          <div className="stat-icon">❌</div>
          <div className="stat-info"><div className="stat-value">{offlineDevices}</div><div className="stat-label">Offline</div></div>
        </div>
        <div className="stat-card alerts">
          <div className="stat-icon">⚠️</div>
          <div className="stat-info"><div className="stat-value">{activeAlerts}</div><div className="stat-label">Active Alerts</div></div>
        </div>
      </div>
      <div className="device-grid">
        {devices.slice(0,4).map(device => (
          <div key={device.id} className={`device-card ${device.status}`} onClick={() => { setSelectedDevice(device); setShowDeviceDetail(true); }}>
            <div className="device-card-header">
              <span className="device-name">{device.name}</span>
              <span className={`status-dot ${device.status}`}></span>
            </div>
            <div className="device-model">{device.model}</div>
            <div className="device-ip">{device.ipAddress}</div>
            <div className="toner-mini">
              {['Black','Cyan','Magenta','Yellow'].map(c => (
                <div key={c} className="toner-mini-bar" style={{background: device[`toner${c}`] < 20 ? '#ef4444' : '#22c55e', width: `${device[`toner${c}`]}%`}} />
              ))}
            </div>
            {device.errorCodes?.length > 0 && <div className="device-alert">⚠️ {device.errorCodes[0]}</div>}
          </div>
        ))}
      </div>
    </div>
  );

  const CustomersView = () => (
    <div className="view">
      <div className="view-header">
        <h1>Customers</h1>
        <button className="btn-primary" onClick={() => setShowAddCustomer(true)}>+ Add Customer</button>
      </div>
      <div className="customers-grid">
        {customers.map(c => (
          <div key={c.id} className="customer-card">
            <div className="customer-logo">{c.logo}</div>
            <div className="customer-info">
              <h3>{c.name}</h3>
              <div className="customer-meta">
                <span>📧 {c.email}</span>
                <span>📞 {c.phone}</span>
                <span>📍 {c.city}, {c.state}</span>
              </div>
              <div className="customer-stats">
                <span className="badge">{c.devices} devices</span>
                <span className={`badge ${c.status}`}>{c.status}</span>
              </div>
            </div>
            <div className="customer-actions">
              <button className="btn-secondary btn-sm" onClick={() => { setCurrentCustomer(c.id); setCurrentView('dashboard'); }}>View Dashboard</button>
              <button className="btn-primary btn-sm" onClick={() => handleGenerateInstaller(c.id)}>📥 Get Installer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const DevicesView = () => (
    <div className="view">
      <div className="view-header">
        <h1>Devices</h1>
        <div className="header-actions">
          <input className="search-input" placeholder="Search devices..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          <button className="btn-primary" onClick={() => setShowAddDevice(true)}>+ Add Device</button>
        </div>
      </div>
      <table className="data-table">
        <thead>
          <tr><th>Name</th><th>Model</th><th>IP</th><th>Location</th><th>Status</th><th>Pages</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {filteredDevices.map(d => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.model}</td>
              <td><code>{d.ipAddress}</code></td>
              <td>{d.location}</td>
              <td><span className={`status-badge ${d.status}`}>{d.status}</span></td>
              <td>{d.pageCount?.toLocaleString()}</td>
              <td>
                <button className="btn-sm btn-secondary" onClick={() => { setSelectedDevice(d); setShowDeviceDetail(true); }}>Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const AlertsView = () => (
    <div className="view">
      <div className="view-header"><h1>Alerts</h1></div>
      <div className="alerts-list">
        {alerts.length === 0 && <div className="empty-state">✅ No active alerts</div>}
        {alerts.map(a => (
          <div key={a.id} className={`alert-item ${a.type} ${a.acknowledged ? 'acked' : ''}`}>
            <div className="alert-icon">{a.type === 'error' ? '🔴' : '🟡'}</div>
            <div className="alert-body">
              <strong>{a.deviceName}</strong>
              <span>{a.message}</span>
              <small>{new Date(a.timestamp).toLocaleString()}</small>
            </div>
            {!a.acknowledged && (
              <button className="btn-sm btn-secondary" onClick={() => setAlerts(prev => prev.map(x => x.id===a.id ? {...x,acknowledged:true} : x))}>Acknowledge</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
          <div className="header-brand">
            <span className="brand-icon">📊</span>
            <span className="brand-text">FleetSync Pro</span>
          </div>
        </div>
        <div className="header-center">
          {currentCustomerData && (
            <select value={currentCustomer} onChange={(e) => setCurrentCustomer(e.target.value)} className="customer-selector">
              {customers.map(c => <option key={c.id} value={c.id}>{c.logo} {c.name}</option>)}
            </select>
          )}
        </div>
        <div className="header-right">
          <button className="header-btn" title="Notifications">🔔</button>
          <button className="header-btn" onClick={() => setShowSettings(true)} title="Settings">⚙️</button>
          <button className="header-btn" title="Profile">👤</button>
        </div>
      </header>

      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <nav className="sidebar-nav">
          <a href="#" className={currentView==='dashboard'?'active':''} onClick={(e)=>{e.preventDefault();setCurrentView('dashboard');}}>📈 Dashboard</a>
          <a href="#" className={currentView==='devices'?'active':''} onClick={(e)=>{e.preventDefault();setCurrentView('devices');}}>🖨️ Devices</a>
          <a href="#" className={currentView==='customers'?'active':''} onClick={(e)=>{e.preventDefault();setCurrentView('customers');}}>👥 Customers</a>
          <a href="#" className={currentView==='alerts'?'active':''} onClick={(e)=>{e.preventDefault();setCurrentView('alerts');}}>⚠️ Alerts</a>
        </nav>
      </aside>

      <main className={`main-content ${!sidebarOpen ? 'full-width' : ''}`}>
        {error && <div className="error-banner" onClick={() => setError(null)}>{error} ✕</div>}
        {loading && <div className="loading">Loading data...</div>}

        {!loading && currentView==='dashboard'  && <DashboardView />}
        {!loading && currentView==='customers'  && <CustomersView />}
        {!loading && currentView==='devices'    && <DevicesView />}
        {!loading && currentView==='alerts'     && <AlertsView />}
      </main>

      {/* Modals — rendered outside main so they don't interfere with routing */}
      {showAddCustomer && (
        <AddCustomerModal
          newCustomer={newCustomer}
          setNewCustomer={setNewCustomer}
          onClose={() => setShowAddCustomer(false)}
          onSubmit={handleAddCustomer}
        />
      )}
      {showAddDevice && (
        <AddDeviceModal
          newDevice={newDevice}
          setNewDevice={setNewDevice}
          onClose={() => setShowAddDevice(false)}
          onSubmit={handleAddDevice}
        />
      )}
      {showDeviceDetail && (
        <DeviceDetailModal
          selectedDevice={selectedDevice}
          onClose={() => setShowDeviceDetail(false)}
        />
      )}
      {showInstallerModal && (
        <InstallerModal
          selectedCustomerForInstaller={selectedCustomerForInstaller}
          installerSettings={installerSettings}
          onClose={() => setShowInstallerModal(false)}
        />
      )}
    </div>
  );
}

export default App;