import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  activeTab: string = 'profile'; // Default active tab

  // Form model
  profileForm = {
    firstName: 'Sarah',
    lastName: 'Johnson',
    username: 'sarahj',
    bio: 'Music enthusiast • Playlist curator • Local music supporter',
    location: 'New York, USA',
    joinDate: 'June 2021',
    privacySettings: {
      visibility: 'public', // 'public' | 'followers' | 'private'
      shareListening: true,
      sharePlaylists: true,
      shareFollowers: false
    },
    preferences: {
      autoplay: true,
      explicitContent: false,
      audioQuality: 'medium', // 'low' | 'medium' | 'high'
      theme: 'light', // 'light' | 'dark' | 'system'
      accentColor: '#6e45e2'
    }
  };

  constructor(private location: Location) {}

  // Set active tab
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  // Check if tab is active
  isTabActive(tab: string): boolean {
    return this.activeTab === tab;
  }

  // Handle back navigation
  goBack(): void {
    this.location.back();
  }

  // Handle avatar upload
  onAvatarUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const avatar = document.getElementById('profileAvatar') as HTMLImageElement;
        if (avatar && e.target) {
          avatar.src = e.target.result as string;
        }
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  // Change privacy option
  setPrivacyOption(option: 'public' | 'followers' | 'private'): void {
    this.profileForm.privacySettings.visibility = option;
  }

  // Change accent color
  setAccentColor(color: string): void {
    this.profileForm.preferences.accentColor = color;
    console.log('Accent color changed to:', color);
  }

  // Save form data
  saveProfile(): void {
    console.log('Profile saved:', this.profileForm);
  }

  // Save privacy settings
  savePrivacySettings(): void {
    console.log('Privacy settings saved:', this.profileForm.privacySettings);
  }

  // Save preferences
  savePreferences(): void {
    console.log('Preferences saved:', this.profileForm.preferences);
  }
}