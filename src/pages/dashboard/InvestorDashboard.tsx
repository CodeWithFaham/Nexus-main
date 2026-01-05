import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, PieChart, Filter, Search, PlusCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { EntrepreneurCard } from '../../components/entrepreneur/EntrepreneurCard';
import { useAuth } from '../../context/AuthContext';
import { Entrepreneur } from '../../types'; 

import { entrepreneurs } from '../../data/users';
import { getRequestsFromInvestor } from '../../data/collaborationRequests';

export const InvestorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  
  if (!user) return null;
  
 
  const sentRequests = getRequestsFromInvestor(user.id);
  
  const filteredEntrepreneurs = (entrepreneurs as Entrepreneur[]).filter(entrepreneur => {
    const matchesSearch = searchQuery === '' || 
      entrepreneur.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.startupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.pitchSummary.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesIndustry = selectedIndustries.length === 0 || 
      selectedIndustries.includes(entrepreneur.industry);
    
    return matchesSearch && matchesIndustry;
  });
  const industries = Array.from(new Set(entrepreneurs.map(e => e.industry)));
  
  const toggleIndustry = (industry: string) => {
    setSelectedIndustries(prevSelected => 
      prevSelected.includes(industry)
        ? prevSelected.filter(i => i !== industry)
        : [...prevSelected, industry]
    );
  };
  
  return (
    <div className="space-y-6 animate-fade-in p-4">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Discover Startups</h1>
          <p className="text-gray-600">Find and connect with promising entrepreneurs</p>
        </div>
        
        <Link to="/entrepreneurs">
          <Button leftIcon={<PlusCircle size={18} />}>
            View All Startups
          </Button>
        </Link>
      </div>
      
      {/* Search & Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="w-full md:w-2/3">
          <Input
            placeholder="Search startups, industries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            startAdornment={<Search size={18} className="text-gray-400" />}
          />
        </div>
        
        <div className="w-full md:w-1/3">
          <div className="flex flex-wrap items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700 mr-2">Filters:</span>
            {industries.map(industry => (
              <Badge
                key={industry}
                variant={selectedIndustries.includes(industry) ? 'primary' : 'gray'}
                className="cursor-pointer"
                onClick={() => toggleIndustry(industry)}
              >
                {industry}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 border-blue-100">
          <CardBody className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full mr-4 text-blue-700">
              <Users size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-700">Total Startups</p>
              <h3 className="text-xl font-bold">{entrepreneurs.length}</h3>
            </div>
          </CardBody>
        </Card>
        
        <Card className="bg-purple-50 border-purple-100">
          <CardBody className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full mr-4 text-purple-700">
              <PieChart size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-purple-700">Industries</p>
              <h3 className="text-xl font-bold">{industries.length}</h3>
            </div>
          </CardBody>
        </Card>
        
        <Card className="bg-green-50 border-green-100">
          <CardBody className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full mr-4 text-green-700">
              <Users size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-green-700">Connections</p>
              <h3 className="text-xl font-bold">
                {sentRequests.filter(req => req.status === 'accepted').length}
              </h3>
            </div>
          </CardBody>
        </Card>
      </div>
      
      {/* Startups List */}
      <div>
        <Card>
          <CardHeader>
            <h2 className="text-lg font-bold text-gray-900">Featured Startups</h2>
          </CardHeader>
          <CardBody>
            {filteredEntrepreneurs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEntrepreneurs.map(ent => (
                  <EntrepreneurCard key={ent.id} entrepreneur={ent} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No results found.</p>
                <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedIndustries([]); }}>
                  Reset Filters
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};