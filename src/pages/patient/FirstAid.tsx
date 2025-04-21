import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { 
  Search, 
  LifeBuoy, 
  Heart, 
  Scissors, 
  Flame, 
  AlertTriangle, 
  ChevronLeft,
  Info
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRequireAuth } from "@/hooks/useRequireAuth";

// First aid procedures data
const firstAidData = [
  {
    id: "cuts",
    title: "Cuts & Wounds",
    icon: Scissors,
    color: "text-red-600",
    bgColor: "bg-red-100",
    content: [
      {
        title: "Clean the wound",
        steps: [
          "Wash your hands thoroughly with soap and water",
          "Clean the cut with mild soap and water",
          "Rinse under clean running water for 5-10 minutes",
          "Remove any dirt or debris gently with tweezers cleaned with alcohol"
        ]
      },
      {
        title: "Stop the bleeding",
        steps: [
          "Apply gentle pressure with a clean cloth or bandage",
          "Keep pressure on the wound until bleeding stops",
          "If blood soaks through, add another bandage on top without removing the first"
        ]
      },
      {
        title: "Protect the wound",
        steps: [
          "Apply antibiotic ointment to prevent infection",
          "Cover with a sterile bandage",
          "Change the bandage daily or whenever it gets wet or dirty"
        ]
      }
    ]
  },
  {
    id: "burns",
    title: "Burns",
    icon: Flame,
    color: "text-orange-500",
    bgColor: "bg-orange-100",
    content: [
      {
        title: "For minor burns (redness, mild swelling)",
        steps: [
          "Cool the burn with cool (not cold) running water for 10-15 minutes",
          "Don't use ice as it can damage tissue",
          "Apply aloe vera gel or moisturizer",
          "Take over-the-counter pain reliever if needed",
          "Cover with a sterile, non-stick bandage"
        ]
      },
      {
        title: "For major burns (severe, deep, or large)",
        steps: [
          "Call emergency services immediately",
          "Don't remove burned clothing stuck to the skin",
          "Cover the burn with a clean, dry sheet or bandage",
          "Elevate the burned area above heart level if possible",
          "Watch for signs of shock (pale skin, weakness, rapid pulse)"
        ]
      }
    ]
  },
  {
    id: "choking",
    title: "Choking",
    icon: AlertTriangle,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    content: [
      {
        title: "If the person can speak or cough",
        steps: [
          "Encourage them to keep coughing",
          "Don't interfere with their attempts to expel the object",
          "Stay with them and monitor their condition"
        ]
      },
      {
        title: "If the person cannot speak or cough",
        steps: [
          "Stand behind the person and wrap your arms around their waist",
          "Make a fist with one hand and place it thumb-side against their abdomen, above the navel",
          "Grasp your fist with your other hand",
          "Perform quick, upward thrusts into their abdomen",
          "Repeat until the object is expelled or the person becomes unconscious",
          "If they become unconscious, call emergency services and begin CPR"
        ]
      }
    ]
  },
  {
    id: "cpr",
    title: "CPR Basics",
    icon: Heart,
    color: "text-pink-600",
    bgColor: "bg-pink-100",
    content: [
      {
        title: "Check responsiveness",
        steps: [
          "Tap the person's shoulder and shout 'Are you OK?'",
          "If no response, call emergency services or ask someone else to",
          "Check for normal breathing"
        ]
      },
      {
        title: "Chest compressions",
        steps: [
          "Place the person on their back on a firm surface",
          "Kneel beside them with shoulders directly over their chest",
          "Place the heel of one hand on the center of their chest",
          "Place your other hand on top and interlock fingers",
          "Keep arms straight and position shoulders directly above hands",
          "Compress chest at least 2 inches (5 cm) deep",
          "Deliver compressions at a rate of 100-120 per minute",
          "Allow chest to fully recoil after each compression"
        ]
      },
      {
        title: "Rescue breaths (if trained)",
        steps: [
          "After 30 compressions, open the airway using head-tilt/chin-lift",
          "Pinch the nose shut and make a complete seal over their mouth with yours",
          "Blow in for about 1 second to make the chest rise",
          "Deliver a second breath",
          "Continue cycle of 30 compressions and 2 breaths until help arrives"
        ]
      }
    ]
  }
];

export default function FirstAid() {
  useRequireAuth("patient");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Filter categories based on search term
  const filteredData = searchTerm
    ? firstAidData.filter(category =>
        category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.content.some(item =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.steps.some(step => step.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      )
    : firstAidData;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar userType="patient" />
      <div className="flex flex-1">
        <Sidebar userType="patient" />
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center mb-4">
                <LifeBuoy className="h-8 w-8 text-blue-600 mr-3" />
                <h1 className="text-3xl font-bold text-gray-800">First Aid Assistant</h1>
              </div>
              
              {/* Search box */}
              <div className="relative max-w-lg">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  className="pl-10 bg-gray-50 border-gray-200"
                  placeholder="Search for first aid procedures..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Find step-by-step guides for common first aid situations. For serious emergencies, always call emergency services.
              </p>
            </div>

            {/* Category detail view */}
            {selectedCategory ? (
              <div className="space-y-6">
                <Button
                  variant="outline"
                  className="mb-4 flex items-center"
                  onClick={() => setSelectedCategory(null)}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> Back to all categories
                </Button>

                {firstAidData.filter(category => category.id === selectedCategory).map(category => (
                  <div key={category.id} className="space-y-6">
                    <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                      <div className={p-3 rounded-full ${category.bgColor} mr-4}>
                        {(() => {
                          const Icon = category.icon;
                          return <Icon className={h-6 w-6 ${category.color}} />;
                        })()}
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">{category.title}</h2>
                    </div>

                    {category.content.map((item, index) => (
                      <Card key={index} className="border-0 shadow-sm">
                        <CardHeader className="bg-gray-50 border-b">
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <ol className="list-decimal pl-5 space-y-3">
                            {item.steps.map((step, stepIdx) => (
                              <li key={stepIdx} className="pl-1 text-gray-700">{step}</li>
                            ))}
                          </ol>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              /* Category grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredData.length > 0 ? (
                  filteredData.map(category => (
                    <Card 
                      key={category.id}
                      className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <CardHeader className={${category.bgColor} pb-2}>
                        <div className="flex items-center mb-2">
                          {(() => {
                            const Icon = category.icon;
                            return <Icon className={h-6 w-6 ${category.color}} />;
                          })()}
                          <CardTitle className="ml-2 text-lg">{category.title}</CardTitle>
                        </div>
                        <CardDescription className="text-gray-600">
                          {category.content.length} procedure{category.content.length > 1 ? 's' : ''}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="text-sm text-gray-600">
                          {category.content[0].title}{category.content.length > 1 ? ' and more...' : ''}
                        </p>
                      </CardContent>
                      <CardFooter className="bg-gray-50 border-t">
                        <Button variant="ghost" className="w-full text-blue-600">View Guide</Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-700">No results found</h3>
                    <p className="text-gray-500">Try adjusting your search term</p>
                  </div>
                )}
              </div>
            )}

            {/* Important notice banner */}
            <div className="mt-10 p-5 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-yellow-800 mb-1">Important Notice</h3>
                  <p className="text-sm text-yellow-700">
                    This first aid guide is for informational purposes only and is not a substitute for professional medical advice,
                    diagnosis, or treatment. In case of emergency, call emergency services immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
