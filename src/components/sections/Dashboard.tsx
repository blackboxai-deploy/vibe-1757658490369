'use client'

import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'

export default function Dashboard() {
  const { selectedChild } = useAuth()

  if (!selectedChild) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Select a child to view their dashboard
        </h2>
      </div>
    )
  }

  const { progress } = selectedChild

  const statCards = [
    {
      title: 'Overall Progress',
      value: `${progress.overallProgress}%`,
      description: 'Complete learning journey',
      progress: progress.overallProgress,
      color: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Letters Mastered',
      value: progress.lettersMastered,
      description: 'Out of 26 letters',
      progress: (progress.lettersMastered / 26) * 100,
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Numbers Completed',
      value: progress.numbersCompleted,
      description: 'Out of 10 numbers',
      progress: (progress.numbersCompleted / 10) * 100,
      color: 'from-yellow-500 to-orange-600'
    },
    {
      title: 'Games Played',
      value: progress.gamesPlayed,
      description: 'Learning through play',
      progress: (progress.gamesPlayed / 20) * 100,
      color: 'from-pink-500 to-red-600'
    }
  ]

  const recentActivities = [
    { action: 'Completed Letter Recognition Quiz', score: '95%', time: '2 hours ago' },
    { action: 'Played Word Matching Game', score: '88%', time: '1 day ago' },
    { action: 'Finished Phonics Module 3', score: '92%', time: '2 days ago' },
    { action: 'Assessment: Reading Comprehension', score: '87%', time: '3 days ago' }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-100">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl shadow-lg">
            {selectedChild.avatar}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {selectedChild.name}!
            </h1>
            <p className="text-lg text-gray-600">
              Ready to continue your learning journey?
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            Continue Learning →
          </Button>
          <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
            View Reports
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`} />
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <Progress value={stat.progress} className="h-2" />
                <p className="text-xs text-gray-500">{stat.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">Recent Activity</CardTitle>
          <CardDescription>
            {selectedChild.name}'s latest learning achievements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{activity.action}</h4>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                    {activity.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-blue-200 hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Continue Learning</h3>
            <p className="text-sm text-gray-600">Resume where you left off</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎮</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Play Games</h3>
            <p className="text-sm text-gray-600">Learn through fun activities</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Take Assessment</h3>
            <p className="text-sm text-gray-600">Check your progress</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}