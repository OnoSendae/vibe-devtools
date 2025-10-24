import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Subject, takeUntil } from 'rxjs';
import { [SERVICE_NAME] } from '../services/[SERVICE_FILE]';
import { [MODEL_NAME] } from '../models/[MODEL_FILE]';

@Component({
    selector: 'app-[COMPONENT_NAME]',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule
    ],
    templateUrl: './[COMPONENT_NAME].component.html',
    styleUrls: ['./[COMPONENT_NAME].component.scss']
})
export class [COMPONENT_CLASS_NAME]Component implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

    data = signal<[MODEL_NAME][]>([]);
    loading = signal<boolean>(false);
    error = signal<string | null>(null);

    constructor(private service: [SERVICE_NAME]) { }

    ngOnInit(): void {
        this.loadData();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    loadData(): void {
        this.loading.set(true);
        this.error.set(null);

        this.service.getAll()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    this.data.set(data);
                    this.loading.set(false);
                },
                error: (err) => {
                    this.error.set(err.message);
                    this.loading.set(false);
                }
            });
    }

    onAction(item: [MODEL_NAME]): void {
    }
}

