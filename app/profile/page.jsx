'use client'
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function PortfolioCard() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Hoobank Website',
      image: '/images/hoobank.png',
      description: 'Modern UI/UX website for a digital banking platform',
      tags: ['Next.js', 'Tailwind CSS', 'React'],
    }
  ]);

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">My Portfolio</h2>
        <Button variant="outline" className="flex items-center gap-2">
          <img src="/images/add.svg" alt="Add project" className="w-4 h-4" />
          <span>Add Project</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="relative">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="icon" variant="secondary" className="rounded-full w-8 h-8 p-1 bg-white/80 hover:bg-white">
                      <img src="/images/edit.svg" alt="Edit" className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Project</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <p>Edit form would go here</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            <CardHeader className="p-4">
              <CardTitle className="text-lg">{project.title}</CardTitle>
            </CardHeader>
            
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-gray-600">{project.description}</p>
            </CardContent>
            
            <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </CardFooter>
          </Card>
        ))}

        {/* Add Project Card */}
        <Card className="flex items-center justify-center h-full min-h-64 border-dashed cursor-pointer hover:bg-gray-50 transition-colors">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <img src="/images/add.svg" alt="Add project" className="w-6 h-6" />
            </div>
            <p className="text-center text-gray-600">Add New Project</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}