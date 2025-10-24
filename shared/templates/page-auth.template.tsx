import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function { { PAGE_NAME } } Page() {
    return (
        <div className="auth-layout">
            <Card className="auth-card">
                <h1>{{ PAGE_TITLE }}</h1>
                <form>
                    {{ FORM_FIELDS }}
                    <Button type="submit" className="w-full">
                        {{ CTA_TEXT }}
                    </Button>
                </form>
            </Card>
        </div>
    );
}

