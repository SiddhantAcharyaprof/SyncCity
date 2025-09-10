import React, { useState } from 'react';
import { DashboardLayout } from './components/dashboard-layout';
import { OverviewDashboard } from './components/overview-dashboard';
import { InteractiveMap } from './components/interactive-map';
import { IssuesTable } from './components/issues-table';
import { SettingsPanel } from './components/settings-panel';
import { LandingPage } from './components/landing-page';

import { PublicIssuesView } from './components/public-issues-view';
import { AboutPage } from './components/about-page';
import { CivicIssue } from './types/index';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedIssue, setSelectedIssue] = useState<CivicIssue | null>(null);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    // Reset active tab when navigating to dashboard
    if (page === 'dashboard') {
      setActiveTab('overview');
    }
  };

  const handleIssueSelect = (issue: CivicIssue) => {
    setSelectedIssue(issue);
  };

  // Public pages (outside dashboard)
  if (currentPage === 'home') {
    return <LandingPage onNavigate={handleNavigate} />;
  }



  if (currentPage === 'public-issues') {
    return <PublicIssuesView onNavigate={handleNavigate} />;
  }

  if (currentPage === 'about') {
    return <AboutPage onNavigate={handleNavigate} />;
  }

  // Dashboard pages (admin interface)
  if (currentPage === 'dashboard') {
    const renderDashboardContent = () => {
      switch (activeTab) {
        case 'overview':
          return <OverviewDashboard />;
        case 'map':
          return <InteractiveMap onIssueSelect={handleIssueSelect} />;
        case 'issues':
          return <IssuesTable />;
        case 'settings':
          return <SettingsPanel />;
        default:
          return <OverviewDashboard />;
      }
    };

    return (
      <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
        {renderDashboardContent()}
      </DashboardLayout>
    );
  }

  // Default fallback
  return <LandingPage onNavigate={handleNavigate} />;
}