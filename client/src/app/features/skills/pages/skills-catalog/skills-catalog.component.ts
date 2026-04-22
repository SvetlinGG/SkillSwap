
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SkillsService } from '../../services/skills.service';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { FormsModule } from '@angular/forms';
import { Skill } from '../../models/skill.model';

@Component({
  selector: 'app-skills-catalog',
  standalone: true,
  imports: [RouterLink, TruncatePipe, FormsModule],
  templateUrl: './skills-catalog.component.html',
  styleUrl: './skills-catalog.component.css'
})
export class SkillsCatalogComponent implements OnInit {

  private skillsService = inject(SkillsService);
  
  skills = signal<Skill[]>([]);
  isLoading = signal(true);
  errorMessage = signal('');

  searchTerm = signal('');
  selectedLevel = signal('All');
  selectedCategory = signal('All');

  categories = computed(() => {
    const uniqueCategories = new Set(
      this.skills()
        .map(skill => skill.category?.trim())
        .filter(Boolean)
    );
    return ['All', ...Array.from(uniqueCategories)];
  });

  filteredSkills = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const level = this.selectedLevel();
    const category = this.selectedCategory();

    return this.skills().filter(skill => {
      const matchesSearch = 
        skill.title.toLowerCase().includes(term) ||
        skill.category.toLowerCase().includes(term) ||
        skill.description.toLowerCase().includes(term);

        const matchesLevel =
          level === 'All' || skill.level === level;

        const matchesCategory =
          category === 'All' || skill.category === category;

        return matchesSearch && matchesLevel && matchesCategory;
    });
  });

  ngOnInit(): void {
    this.skillsService.getSkills().subscribe({
      next: (data) => {
        this.skills.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.message || 'Failed to load skills');
        this.isLoading.set(false);
      }
    });
  }

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
  }

  onLevelChange(value: string): void {
    this.selectedLevel.set(value);
  }

  onCategoryChange(value: string): void {
    this.selectedCategory.set(value);
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.selectedLevel.set('All');
    this.selectedCategory.set('All');
  }

}
