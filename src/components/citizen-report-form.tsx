import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  ArrowLeft,
  MapPin, 
  Camera, 
  Upload,
  CheckCircle,
  AlertTriangle,
  Phone,
  Mail,
  User,
  Building,
  Lightbulb,
  Truck,
  TreePine,
  Shield
} from 'lucide-react';

interface CitizenReportFormProps {
  onNavigate: (page: string) => void;
}

const categoryOptions = [
  { value: 'roads', label: 'Roads & Transportation', icon: Building, description: 'Potholes, traffic signals, road signs' },
  { value: 'infrastructure', label: 'Infrastructure', icon: Lightbulb, description: 'Streetlights, sidewalks, utilities' },
  { value: 'sanitation', label: 'Sanitation', icon: Truck, description: 'Trash collection, litter, illegal dumping' },
  { value: 'public-safety', label: 'Public Safety', icon: Shield, description: 'Damaged barriers, broken fixtures' },
  { value: 'environmental', label: 'Environmental', icon: TreePine, description: 'Flooding, drainage, environmental hazards' }
];

const priorityOptions = [
  { value: 'low', label: 'Low', description: 'Non-urgent, can wait' },
  { value: 'medium', label: 'Medium', description: 'Should be addressed soon' },
  { value: 'high', label: 'High', description: 'Needs prompt attention' },
  { value: 'urgent', label: 'Urgent', description: 'Safety hazard, immediate attention needed' }
];

export function CitizenReportForm({ onNavigate }: CitizenReportFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: '',
    location: '',
    address: '',
    name: '',
    email: '',
    phone: '',
    anonymous: false,
    notifications: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.title && formData.description && formData.category;
      case 2:
        return formData.priority && formData.address;
      case 3:
        return formData.anonymous || (formData.name && formData.email);
      case 4:
        return true;
      default:
        return false;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="size-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="size-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Report Submitted!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for reporting this issue. We've received your report and assigned it ID #{Math.random().toString(36).substr(2, 8).toUpperCase()}.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <Badge variant="outline">Under Review</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Expected Response:</span>
                <span>1-2 business days</span>
              </div>
            </div>
            <div className="space-y-2">
              <Button 
                className="w-full" 
                onClick={() => onNavigate('public-issues')}
              >
                View All Issues
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => onNavigate('home')}
              >
                Return Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigate('home')}
            >
              <ArrowLeft className="size-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold">Report an Issue</h1>
              <p className="text-sm text-muted-foreground">Help improve your community</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-8">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Describe the Issue</h2>
                  <p className="text-muted-foreground">Tell us what's happening in your community</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Issue Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Large pothole on Main Street"
                      value={formData.title}
                      onChange={(e) => updateFormData('title', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide details about the issue, its impact, and any safety concerns..."
                      value={formData.description}
                      onChange={(e) => updateFormData('description', e.target.value)}
                      className="mt-1 min-h-32"
                    />
                  </div>

                  <div>
                    <Label>Category *</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                      {categoryOptions.map((category) => (
                        <div
                          key={category.value}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            formData.category === category.value
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => updateFormData('category', category.value)}
                        >
                          <div className="flex items-start gap-3">
                            <category.icon className="size-5 text-blue-600 mt-0.5" />
                            <div>
                              <div className="font-medium">{category.label}</div>
                              <div className="text-sm text-muted-foreground">{category.description}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Location & Priority</h2>
                  <p className="text-muted-foreground">Help us understand where and how urgent this is</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address">Address or Location *</Label>
                    <div className="relative mt-1">
                      <MapPin className="size-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="address"
                        placeholder="e.g., 123 Main Street or near City Hall"
                        value={formData.address}
                        onChange={(e) => updateFormData('address', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Be as specific as possible to help our teams locate the issue
                    </p>
                  </div>

                  <div>
                    <Label>Priority Level *</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                      {priorityOptions.map((priority) => (
                        <div
                          key={priority.value}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            formData.priority === priority.value
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => updateFormData('priority', priority.value)}
                        >
                          <div className="font-medium capitalize">{priority.label}</div>
                          <div className="text-sm text-muted-foreground">{priority.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex gap-3">
                      <Camera className="size-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900">Add Photos (Optional)</h4>
                        <p className="text-sm text-blue-700 mb-3">
                          Photos help our teams understand and resolve issues faster
                        </p>
                        <Button variant="outline" size="sm" className="border-blue-200">
                          <Upload className="size-4 mr-2" />
                          Upload Photos
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
                  <p className="text-muted-foreground">Help us keep you updated on the progress</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="anonymous"
                      checked={formData.anonymous}
                      onCheckedChange={(checked) => updateFormData('anonymous', checked)}
                    />
                    <Label htmlFor="anonymous" className="text-sm">
                      Submit anonymously (you won't receive updates)
                    </Label>
                  </div>

                  {!formData.anonymous && (
                    <div className="space-y-4 p-4 border rounded-lg">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <div className="relative mt-1">
                          <User className="size-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="name"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={(e) => updateFormData('name', e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <div className="relative mt-1">
                          <Mail className="size-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={(e) => updateFormData('email', e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number (Optional)</Label>
                        <div className="relative mt-1">
                          <Phone className="size-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="phone"
                            placeholder="(555) 123-4567"
                            value={formData.phone}
                            onChange={(e) => updateFormData('phone', e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="notifications"
                          checked={formData.notifications}
                          onCheckedChange={(checked) => updateFormData('notifications', checked)}
                        />
                        <Label htmlFor="notifications" className="text-sm">
                          Send me email updates about this issue
                        </Label>
                      </div>
                    </div>
                  )}

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Privacy Notice</h4>
                    <p className="text-sm text-muted-foreground">
                      Your contact information will only be used to update you about this specific issue. 
                      We do not share your information with third parties or use it for marketing purposes.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Review & Submit</h2>
                  <p className="text-muted-foreground">Please review your report before submitting</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Issue Details</h4>
                    <div className="space-y-2 text-sm">
                      <div><strong>Title:</strong> {formData.title}</div>
                      <div><strong>Category:</strong> {categoryOptions.find(c => c.value === formData.category)?.label}</div>
                      <div><strong>Priority:</strong> {priorityOptions.find(p => p.value === formData.priority)?.label}</div>
                      <div><strong>Location:</strong> {formData.address}</div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-sm text-muted-foreground">{formData.description}</p>
                  </div>

                  {!formData.anonymous && (
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Contact Information</h4>
                      <div className="space-y-1 text-sm">
                        <div><strong>Name:</strong> {formData.name}</div>
                        <div><strong>Email:</strong> {formData.email}</div>
                        {formData.phone && <div><strong>Phone:</strong> {formData.phone}</div>}
                      </div>
                    </div>
                  )}

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex gap-3">
                      <AlertTriangle className="size-5 text-blue-600" />
                      <div>
                        <h4 className="font-medium text-blue-900">What happens next?</h4>
                        <ul className="text-sm text-blue-700 mt-1 space-y-1">
                          <li>• Your report will be reviewed within 1-2 business days</li>
                          <li>• It will be assigned to the appropriate department</li>
                          <li>• You'll receive updates if you provided contact information</li>
                          <li>• Expected resolution varies by issue type and priority</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting}
                  className="bg-gradient-to-r from-blue-600 to-green-600"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Report'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}