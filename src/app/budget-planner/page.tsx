// src/app/budget-planner/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { DollarSign, Building, Brush, Home } from 'lucide-react';

const BASE_RATE_PER_SQFT = 2400;

const COST_BREAKDOWN_PERCENTAGES = {
  foundation: 0.15,
  structure: 0.30,
  exterior: 0.15,
  interior: 0.25,
  finishing: 0.15,
};

const STYLE_MODIFIERS = {
  floors: { '1': 1.0, '2': 1.1, '3': 1.2 },
  interior: { minimal: 0.9, standard: 1.0, premium: 1.2 },
  design: { basic: 1.0, contemporary: 1.15 },
};

export default function BudgetPlannerPage({ params }: { params: { slug: string } }) {
  const [sqft, setSqft] = useState(1000);
  const [floors, setFloors] = useState<'1' | '2' | '3'>('1');
  const [interior, setInterior] = useState<'minimal' | 'standard' | 'premium'>('standard');
  const [design, setDesign] = useState<'basic' | 'contemporary'>('basic');

  const totalCost = useMemo(() => {
    if (!sqft || sqft <= 0) return 0;
    const baseCost = sqft * BASE_RATE_PER_SQFT;
    const floorModifier = STYLE_MODIFIERS.floors[floors];
    const interiorModifier = STYLE_MODIFIERS.interior[interior];
    const designModifier = STYLE_MODIFIERS.design[design];

    return baseCost * floorModifier * interiorModifier * designModifier;
  }, [sqft, floors, interior, design]);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const costBreakdown = useMemo(() => {
    return Object.entries(COST_BREAKDOWN_PERCENTAGES).map(([key, percentage]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      amount: formatCurrency(totalCost * percentage),
    }));
  }, [totalCost]);

  return (
    <div className="bg-background">
      <div className="container mx-auto py-16 md:py-24 px-5">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl">Home Budget Planner</h1>
          <p className="mt-4 text-muted-foreground">
            Get a real-time estimate for your dream home. Adjust the options below to see how different choices affect the overall budget. The rate of ₹2400/sqft includes all work from basement to handover.
          </p>
        </div>

        <div className="mt-16 grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline">Customize Your Home</CardTitle>
              <CardDescription>Select your preferences to calculate the estimated cost.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="sqft" className="flex items-center gap-2 font-semibold">
                    <Home className="w-5 h-5" /> Area (in square feet)
                  </Label>
                  <Input
                    id="sqft"
                    type="number"
                    value={sqft}
                    onChange={(e) => setSqft(Number(e.target.value))}
                    placeholder="e.g., 1200"
                    className="text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 font-semibold">
                    <Building className="w-5 h-5" /> Number of Floors
                  </Label>
                   <RadioGroup value={floors} onValueChange={(v: any) => setFloors(v)} className="flex pt-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="f1" />
                      <Label htmlFor="f1">One</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="f2" />
                      <Label htmlFor="f2">Two</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3" id="f3" />
                      <Label htmlFor="f3">Three+</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
               <div className="space-y-4">
                  <Label className="flex items-center gap-2 font-semibold">
                    <Brush className="w-5 h-5" /> Interior Style
                  </Label>
                  <RadioGroup value={interior} onValueChange={(v: any) => setInterior(v)} className="grid sm:grid-cols-3 gap-4 pt-2">
                    <Label className="border rounded-md p-4 flex justify-between items-center cursor-pointer has-[input:checked]:border-primary has-[input:checked]:bg-primary/5">
                      <span>Minimal</span>
                      <RadioGroupItem value="minimal" />
                    </Label>
                     <Label className="border rounded-md p-4 flex justify-between items-center cursor-pointer has-[input:checked]:border-primary has-[input:checked]:bg-primary/5">
                      <span>Standard</span>
                      <RadioGroupItem value="standard" />
                    </Label>
                     <Label className="border rounded-md p-4 flex justify-between items-center cursor-pointer has-[input:checked]:border-primary has-[input:checked]:bg-primary/5">
                      <span>Premium</span>
                      <RadioGroupItem value="premium" />
                    </Label>
                  </RadioGroup>
              </div>
               <div className="space-y-4">
                  <Label className="flex items-center gap-2 font-semibold">
                    <Home className="w-5 h-5" /> Design Style
                  </Label>
                  <RadioGroup value={design} onValueChange={(v: any) => setDesign(v)} className="grid sm:grid-cols-2 gap-4 pt-2">
                    <Label className="border rounded-md p-4 flex justify-between items-center cursor-pointer has-[input:checked]:border-primary has-[input:checked]:bg-primary/5">
                      <span>Basic</span>
                      <RadioGroupItem value="basic" />
                    </Label>
                     <Label className="border rounded-md p-4 flex justify-between items-center cursor-pointer has-[input:checked]:border-primary has-[input:checked]:bg-primary/5">
                      <span>Contemporary</span>
                      <RadioGroupItem value="contemporary" />
                    </Label>
                  </RadioGroup>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-8">
            <Card className="shadow-lg sticky top-24">
              <CardHeader className="text-center bg-primary/10">
                <p className="text-muted-foreground">Estimated Total Cost</p>
                <p className="text-4xl font-bold font-headline text-primary tracking-tight">{formatCurrency(totalCost)}</p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-6 space-y-4">
                  <h3 className="font-semibold font-headline">Cost Breakdown</h3>
                   <ul className="space-y-3 text-sm">
                    {costBreakdown.map((item) => (
                      <li key={item.name} className="flex justify-between items-center">
                        <span className="text-muted-foreground">{item.name}</span>
                        <span className="font-medium">{item.amount}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-muted/50 px-6 py-3 text-xs text-center text-muted-foreground">
                  This is an estimate. Final cost may vary based on material choices and site conditions.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
