function GetElementValue(idElement)
{
    return document.getElementById(idElement).value;
}

function GetFloat(idElement)
{
    return parseFloat(GetElementValue(idElement));
}

// Функция для интеграла
function F(x)
{
    if(document.getElementById('first').checked)
        return Math.sin(x*x + 2*x);
    
    if(document.getElementById('second').checked)
        return Math.log(1+x);

    if(document.getElementById('third').checked)
        return Math.log(5*x) + Math.sin(2*x);
    if(document.getElementById('fourth').checked)
        return Math.sin(x) + Math.cos(Math.log(x));
}

function Solve(top, bot, eps, methodNum)
{
    // Метод Симпсона
    if (methodNum == 0)
    {
        var I = eps + 1;
        var I1 = 0;
        for (var N = 2; (N <= 4) || (Math.abs(I1 - I) > eps); N *= 2)
        {
            var h, sum2 = 0, sum4 = 0, sum = 0;
            h = (bot - top) / (2 * N);
            for (var i = 1; i < 2 * N - 1; i += 2)
            {
                sum4 += F(top + h * i);
                sum2 += F(top + h * (i + 1));
            }
            sum = F(top) + 4 * sum4 + 2 * sum2 - F(bot);
            I = I1;
            I1 = (h / 3) * sum;
        }
        return I1;
    }
    // Метод трапеций
    if (methodNum == 1)
    {
        var n = (bot - top) / eps;
        var y = F(top) + F(bot);
        var dy = (bot - top) / n;
        for (var i = 1; i < n; i++)
        {
            y += 2 * F(top + dy * i);
        }
        I = (bot - top) / (2 * n) * y;
        return I;
    }
}


function btnCalcClick() {
    var top = GetFloat("top");
    var bot = GetFloat("bot");
    var eps = GetFloat("accuracy");
    var correctInput = true;
    if (isNaN(top))
    {
        alert("Некорректное значение верхнего предела!");
        correctInput = false;
        return;
    }
    if (isNaN(bot))
    {
        alert("Некорректное значение нижнего предела!");
        correctInput = false;
        return;
    }
    if (isNaN(eps))
    {
        alert("Некорректное значение точности!");
        correctInput = false;
        return;
    }
    if (correctInput)
    {
        var methodId = 0;
        if (document.getElementById("simpson").checked)
        {
            methodId = 0;
        }
        if (document.getElementById("trap").checked)
        {
            methodId = 1;
        }
        // console.log(Solve(top, bot, eps, methodId));
        document.getElementById('result').innerHTML = 'Ответ: ' + Solve(top, bot, eps, methodId);
    }
}